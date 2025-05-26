import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ButtonGroup, CloseButton, ModalContainer, ModalHeader } from "./style";
import Botao from "../Botao";

interface ModalProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  handleClick: () => void;
  onOutsideClick?: boolean;
}
export interface ModalHandle {
  open: () => void;
  close: () => void;
}
const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ icon, title, children, handleClick, onOutsideClick }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const closeModal = () => {
      dialogRef.current?.close();
    };

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: closeModal,
    }));

    const handleOutsideClick = (
      evento: React.MouseEvent<HTMLDialogElement>
    ) => {
      if (onOutsideClick && evento.target === dialogRef.current) {
        closeModal();
      }
    };

    return (
      <ModalContainer ref={dialogRef} onClick={handleOutsideClick}>
        <ModalHeader>
          <div>
            {icon} {title}
          </div>
          <CloseButton onClick={closeModal}>x</CloseButton>
        </ModalHeader>
        {children}
        <ButtonGroup>
          <Botao $variante="secundario" onClick={closeModal}>
            Cancelar
          </Botao>
          <Botao
            $variante="primario"
            onClick={() => {
              handleClick();
              closeModal();
            }}
          >
            Adicionar
          </Botao>
        </ButtonGroup>
      </ModalContainer>
    );
  }
);

export default Modal;
