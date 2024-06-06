import { useToast } from "@/components/ui/use-toast"

const Toast = ({title, description, variant="outline"}) => {
    const { toast } = useToast()
  return (
    toast({
        variant:variant,
        title: title,
        description: description,
      })
  )
}

export default Toast