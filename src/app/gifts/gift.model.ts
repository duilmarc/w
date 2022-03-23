export class Gift {
  name: string;
  description: string;
  url: string;
  image: string;

  constructor(name: string, description: string, url: string, image: string) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.image = image;
  }
}
