import { observable, action } from "mobx";

class MobileStore {

    @observable startX = 0;
    @observable touchX = 0;
    @observable changeX = 0;

    @action
    touch(){
        console.log(this.startX);
    }
}

export const mobStore = new MobileStore();