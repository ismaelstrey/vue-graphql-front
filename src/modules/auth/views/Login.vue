<template>
  <v-container fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card class="elevation-12">

          <v-toolbar
            color="primary"
            dark
          >
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>

              <v-text-field
                prepend-icon="mdi-email"
                name="email"
                label="Email"
                type="email"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              >
              </v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Senha"
                type="password"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              >
              </v-text-field>

            </v-form>
            <v-btn
              block
              depressed
              color="secondary"
              @click="log"
            >
              Criar conta
            </v-btn>
          </v-card-text>

          <v-card-actions>
            <v-spacer> </v-spacer>
            <v-btn
              :disabled="$v.$invalid"
              color="primary"
              large
              @click="submit"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {

    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Email é Obrigatório')
      !email.email && errors.push('Insira um email valido')
      return errors
    },

    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Senha é Obrigatório')
      !password.minLength && errors.push(`Insira pelomenos ${password.$params.minLength.min} caracteres`)
      return errors
    }
  },
  methods: {

    log () {
      console.log('Vuelidate', this.$v)
    },

    submit () {
      console.log('User: ', this.user)
    }
  }
}
</script>
