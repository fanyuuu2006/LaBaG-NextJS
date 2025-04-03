import Swal, { SweetAlertOptions } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@/style/Alert.css";

export const Toast = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  iconColor: "white",
  color: "#FFFFFF",
  customClass: {
    popup: "toast-color",
  },
});

export const Modal = withReactContent(Swal);

export type CustomModalProps = Omit<
  SweetAlertOptions,
  "background" | "showConfirmButton" | "showCancelButton" | "allowOutsideClick"
>;
export const CustomModal = (props: CustomModalProps) => {
  Modal.fire({
    background: "transparent",
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: true,
    ...props,
  });
};
