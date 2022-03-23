export class Gift {
  uuid?: string;
  name: string;
  description?: string;
  url?: string;
  image?: string;

  constructor(
    uuid: string,
    name: string,
    description: string,
    url: string,
    image: string
  ) {
    this.uuid = uuid;
    this.name = name;
    this.description = description;
    this.url = url;
    this.image = image;
  }
}
