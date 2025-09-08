import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import settingValidation from "@/lib/validations/setting-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Building2Icon, Loader2Icon, SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

function CompanyInformation({ user }) {
  const form = useForm({
    resolver: zodResolver(settingValidation.settings),
    defaultValues: {
      companyName: user.unsafeMetadata.businessName || "",
      address: user.unsafeMetadata.address || "",
      phone: user.unsafeMetadata.phone || "",
    },
  })
  const { isPending: saving, mutate: save } = useMutation({
    mutationFn: async (values) => {
      return await user.update({
        unsafeMetadata: {
          businessName: values.companyName,
          address: values.address,
          phone: values.phone,
        },
      })
    },
    onSuccess: () => toast.success("Company information updated successfully"),
    onError: () =>
      toast.error("An error occurred while saving company information."),
  })

  const onSubmit = async (values) => {
    save(values)
  }

  const isCompanyInfoComplete =
    user.unsafeMetadata.businessName &&
    user.unsafeMetadata.address &&
    user.unsafeMetadata.phone

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2Icon className="h-5 w-5" />
                <CardTitle>Company Information</CardTitle>
                {!isCompanyInfoComplete && (
                  <Badge variant="warning">Required</Badge>
                )}
                {isCompanyInfoComplete && (
                  <Badge variant="success">Complete</Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {!isCompanyInfoComplete
                ? "Please complete your company information. These details are essential for your business profile."
                : "Your company information is complete and will be used across the application."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel className="flex items-center space-x-1">
                      <span>Company Name</span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel className="flex items-center space-x-1">
                      <span>Phone Number</span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. +62 812-3456-7890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel className="flex items-center space-x-1">
                      <span>Company Address</span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your complete company address"
                        className="min-h-[80px]"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="min-w-[120px]"
            disabled={saving}
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            {saving ? <Loader2Icon className="animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CompanyInformation
