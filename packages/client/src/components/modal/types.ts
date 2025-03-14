export interface IModalProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  onConfirm?: () => Promise<void> | VoidFunction;
  onClose?: VoidFunction;
}
