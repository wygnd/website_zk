module.exports = class userDto {
  id;
  email;
  name;
  last_name;
  access;

  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.name = model?.name;
    this.last_name = model?.last_name;
    this.access = model?.access;
  }
};
