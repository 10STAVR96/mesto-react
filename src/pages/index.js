import './index.css';
import Card from '../js/components/Card.js';
import Section from '../js/components/Section.js';
import FormValidator from '../js/components/FormValidator.js';
import popupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';
import {
    templateElementsClass,
    elements,
    formElements,
    profileAddButton,
    formCard,
    editButton,
    formProfile,
    elementImage,
    authorInput,
    statusInput,
    formProfileInfo,
    profileAvatar,
    profileEditAvatarButton,
    formAvatar,
    formCardRemove,
    avatarLinkInput,
    token,
    cohortId,
    prepend,
} from '../js/utils/constants.js';

/*============== ниже функция чистки ошибок ======================*/
const cleanErrors = (element) => {
    const inputList = Array.from(element.querySelectorAll('.popup__input'));
    const errorList = Array.from(element.querySelectorAll(`.popup__input-error`));
    const submitButton = element.querySelector('.popup__save');

    inputList.forEach((input) => {
        if (!input.value) {           /*данная конструкция деактивирует кнопку при открытии формы formCard и активирует ее для form-profile*/
            submitButton.classList.add('popup__save_disabled');
            submitButton.setAttribute('disabled', 'true');
        } else {
            submitButton.classList.remove('popup__save_disabled');
            submitButton.removeAttribute('disabled');
        }
        input.classList.remove('popup__input_type_error');
    });
    errorList.forEach((error) => {
        error.classList.remove('popup__error_visible');
        error.textContent = '';
    });
}

/*==== ниже класс Api для связи с сервером =====*/
const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

/*========== ниже функции для статуса загрузок и ошибок при отправке/получении данных ===========*/
const renderLoading = (isLoading, form, defaultButtonText, loadingMessage) => {  /*не знаю как упростить эту функцию, делал как в тренажере*/
    const currentButton = form.querySelector('.popup__save');

    if(isLoading) {
        currentButton.textContent = loadingMessage;
    } else {
        currentButton.textContent = defaultButtonText;
    }
  }

/*=============== ниже классы и функции для редактирования профиля ==================*/
const userInfo = new UserInfo (formProfileInfo, profileAvatar); /*класс информации о пользователе*/

const editFormProfile = new PopupWithForm ({  /*класс формы редактирования профиля*/
    submitFormHandler: (item) => {
        renderLoading(true, formProfile,'Сохранить', 'Сохранение...');
        api.editProfileUser(item.author, item.status)
            .then((result) => {
                userInfo.setUserInfo(result);
                editFormProfile.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, formProfile,'Сохранить', 'Сохранение...');
            });
    }
}, formProfile);

const profileEditHandler = () => {          /*открытие/закрытие формы редактирования профиля*/
    const infoUser = userInfo.getUserInfo();
    authorInput.value = infoUser.author;
    statusInput.value = infoUser.status;
    editFormProfile.open();
    cleanErrors(formProfile);
};

/*============ ниже классы и функции для редактирования аватара профиля ================*/

const editProfileAvatar = new PopupWithForm ({  /*класс формы редактирования аватара*/
    submitFormHandler: (item) => {
        renderLoading(true, formAvatar,'Сохранить', 'Сохранение...');
        api.editProfileAvatar(item.link)
            .then((result) => {
                userInfo.setUserAvatar(result);
                editProfileAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, formAvatar,'Сохранить', 'Сохранение...');
            });
    }
}, formAvatar);

const profileEditAvatarHandler = () => {   /*открытие формы редактирования аватара профиля*/
    avatarLinkInput.value = userInfo.getUserAvatar();
    editProfileAvatar.open();
    cleanErrors(formAvatar);
}

/*============= ниже классы и функции для удаления карточки ===========*/
let currentCard; /*переменная для хранения значений текущей карточки (нужно для удаления и лайков и должна находиться именно в index.js)*/

const deleteCardConfirmation = new PopupWithForm ({  /*класс формы подтверждения удаления карточки*/
    submitFormHandler: () => {
        api.deleteCard(currentCard.object._id)  /*удаление карточки*/
            .then((result) => {
                currentCard.class.handleRemove();
                deleteCardConfirmation.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, formCardRemove);

/*=========== ниже функции для добавления и удаления лайков =============*/
const addLike = (object) => {      /*добавление лайка*/
    api.addLike(object)
        .then((result) => {
            currentCard.class.handleLike(result.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteLike = (object) => {   /*удаление лайка*/
    api.deleteLikes(object)
        .then((result) => {
            currentCard.class.handleLike(result.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
}

/*======= ниже классы и функции для добавления карточек (в том числе начальных) ==========*/
const popupImage = new popupWithImage(elementImage);  /*класс для открытия формы картинки карточки*/

const addCardsToDom = (card, position) => {     /*добавление карточки в DOM*/
    if(position==='prepend') {
        defaultCardList.addPrependItem(card);
    } else {
        defaultCardList.addAppendItem(card);
    }
};

const writeCurrentCard = (object, className) => { /*запись значений в текущую карточку*/
    currentCard = {
        object: object,
        class: className
    };
};

const createCard = (item, userId, position) => {  /*создание карточки и добавление в разметку*/
    const card = new Card ({
        data: item,
        handleClickImage: () => {
            popupImage.open(item);
        },
        handleClickLike: (cardObject) => {
            if(cardObject.like) {
                deleteLike(cardObject);
            } else {
                addLike(cardObject);
            }
            writeCurrentCard(item, card);
        },
        handleClickDelete: () => {
            deleteCardConfirmation.open();
            writeCurrentCard(item, card);
        }
    }, templateElementsClass, userId);
    const cardElement = card.generateCard();
    addCardsToDom(cardElement, position);
};

const formAddCard = new PopupWithForm ({   /*класс открытия/закрытия попапа добавления карточки*/
    submitFormHandler: (item) => {
        renderLoading(true, formCard,'Создать', 'Создание...');
        api.addCard(item)     /*добавление карточки на сервер*/
            .then((result) => {
                createCard(result, result.owner._id, prepend);
                formAddCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, formCard,'Создать', 'Создание...');
            });
    }
}, formCard);

const OpenAddCardHandler = () => {    /*открытие/закрытие попапа добавления карточки*/
    formAddCard.open();
    cleanErrors(formCard);
};

const defaultCardList = new Section({  /*класс для добавления начальных карточек*/
    renderer: (item, userId) => {
        createCard(item, userId);  /*третий параметр не указан, значит по умолчанию position="append"*/
    }
}, elements);

/*ниже классы для валидации форм*/
const formProfileValidation = new FormValidator(formElements, formProfile); /*валидация формы профиля*/
const formAvatarValidation = new FormValidator(formElements, formAvatar); /*валидация формы изменения аватара*/
const formCardValidation = new FormValidator(formElements, formCard); /*валидация формы добавления карточки*/
/*ниже события и запуск валидации*/
profileEditAvatarButton.addEventListener('click', profileEditAvatarHandler);  /*редактирование аватара профиля*/
editButton.addEventListener('click', profileEditHandler); /*редактирование профиля*/
profileAddButton.addEventListener('click', OpenAddCardHandler); /*добавление новой карточки*/
formProfileValidation.enableValidation(); /*запуск валидация формы профиля*/
formCardValidation.enableValidation(); /*запуск валидация формы добавления карточки*/
formAvatarValidation.enableValidation(); /*запуск валидации формы изменения аватара*/

Promise.all([api.getProfileInfo(), api.getCards()]) /*загрузка данных профиля и карточек (спасибо, что показали как правильно)*/
    .then(([user, cards]) => {
        userInfo.setUser(user);
        defaultCardList.renderItems(cards, user._id);
    })
    .catch((err) => {
        console.log(err);
    });