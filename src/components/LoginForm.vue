<template>
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      :initial-values="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-96"
    >
      <!-- Username -->
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message
          v-if="$form.username?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.username.error?.message }}
        </Message>
      </div>

      <!-- Password -->
      <div class="flex flex-col gap-1">
        <Password
          name="password"
          placeholder="Password"
          :feedback="false"
          fluid
        />
        <template v-if="$form.password?.errors?.length">
          <Message
            v-for="(error, index) in $form.password.errors"
            :key="index"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ error.message }}
          </Message>
        </template>
      </div>

      <!-- Submit -->
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { Form } from '@primevue/forms'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import type { FormSubmitEvent } from '@primevue/forms'

const emit = defineEmits(["login"]);

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(20, { message: 'Maximum 20 characters.' }),
  password: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    // .max(8, { message: 'Maximum 8 characters.' })
    .refine((v) => /[a-z]/.test(v), { message: 'Must have a lowercase letter.' })
    .refine((v) => /[A-Z]/.test(v), { message: 'Must have an uppercase letter.' })
    .refine((v) => /\d/.test(v), { message: 'Must have a number.' })
})

type FormSchema = z.infer<typeof formSchema>

const toast = useToast()

const initialValues = reactive<FormSchema>({
  username: 'client',
  password: 'Password123'
})

const resolver = ref(
  zodResolver(formSchema, { mode: 'all' })
)


const onFormSubmit = (event: FormSubmitEvent<Record<string, any>>) => {
  emit("login", event.values);
  // const values = event.values as FormSchema
  // console.log('isValid:', event.valid)
  // console.log('form data:', values)

  // if (event.valid) {
  //   toast.add({
  //     severity: 'success',
  //     summary: 'Form submitted successfully!',
  //     detail: `Welcome, ${event.values.username}`,
  //     life: 3000
  //   })
  // }
}

</script>
