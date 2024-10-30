import { makeAutoObservable } from "mobx";

class ModalStore {
  isEditOpened= false;
  isDeleteOpened = false;

  constructor () {
    makeAutoObservable(this);
  };
}