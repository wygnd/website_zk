module.exports = class userDto {
    email;
    id;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
    }

}