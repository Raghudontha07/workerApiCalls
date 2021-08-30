export class ErrorMessageService {
  static getErrorMessage(result) {
    let errorMessage = '';
    switch (result.status) {
      case 404:
        errorMessage = result.data.error;
        break;
      case 409:
        errorMessage = result.data.errorMessage;
        break;
      default:
        errorMessage = result.statusText;
        break;
    }
    return errorMessage;
  }
}
