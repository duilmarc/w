export class DialogData {
  constructor(
    public message: string,
    public title?: string,
    public confirmText?: string,
    public cancelText?: string
  ) {
    this.title = this.title ?? "Confirmar";
    this.confirmText = this.confirmText ?? "Confirmar";
    this.cancelText = this.cancelText ?? "Cancelar";
  }
}
