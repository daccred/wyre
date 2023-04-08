type styledToasttype = {
  status: 'info' | 'warning' | 'success' | 'error' | 'loading';
  description: string;
  id?: string;
  toast: any;
};

export default function styledToast({ status, description, id, toast }: styledToasttype) {
  toast.closeAll();
  return toast({
    id: id,
    description: description,
    status: status,
    duration: 2000,
    position: 'top',
    containerStyle: {
      fontSize: 'sm',
    },
  });
}
