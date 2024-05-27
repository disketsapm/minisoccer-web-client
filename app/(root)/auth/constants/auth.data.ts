export enum ActionType {
  RegisterSuccess = "register-success",
  EmailVerified = "email-verified",
  WaitingPayment = "waiting-payment",
  ForgotPassword = "forgot-password",
  ForgotPasswordVerify = "forgot-password-verify",
  ForgotPasswordSuccess = "forgot-password-success",
  OrderStatus = "order-status",
}

export enum TransactionStatusEnum {
  Pending = "pending",
  Success = "settlement",
  Cancel = "cancel",
  Expired = "expire",
  Deny = "deny",
}

export const getLabelByTab = (activeTab: string): string => {
  switch (activeTab) {
    case "register":
      return "Buat Akun";
    case "login":
      return "Masuk";
    default:
      return "";
  }
};

export const getLabelByType = (type: ActionType | string): string => {
  switch (type) {
    case ActionType.RegisterSuccess:
    case ActionType.EmailVerified:
      return "Buat Akun";
    case ActionType.WaitingPayment:
    case ActionType.OrderStatus:
      return "Pembayaran";
    case ActionType.ForgotPassword:
    case ActionType.ForgotPasswordVerify:
    case ActionType.ForgotPasswordSuccess:
      return "Lupa Password";
    default:
      return "";
  }
};
