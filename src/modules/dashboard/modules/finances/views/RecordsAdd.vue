<template>
  <v-container text-center>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        md4
        lg4
      >
        <NumericDisplay
          :color="color"
          v-model="$v.record.amount.$model"
        />
      </v-flex>
      <v-flex
        xs12
        sm6
        md8
        lg8
      >
        <v-card>
          <v-card-text>
            <v-form>
              <v-dialog
                ref="dateDialog"
                :return-value.sync="record.date"
                v-model="showDateDialog"
                persistent
                width="290px"
              >
                <template v-slot:activator="{on}">
                  <v-text-field
                    name="date"
                    label="Vencimento"
                    prepend-icon="mdi-calendar-month"
                    type="text"
                    readonly
                    :value="formatedDate"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker
                  :color="color"
                  locale="pt-br"
                  scrollable
                  v-model="dateDialogValue"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    :color="color"
                    @click="cancelDateDialog"
                  >Cancelar</v-btn>
                  <v-btn
                    text
                    :color="color"
                    @click="$refs.dateDialog.save(dateDialogValue)"
                  >Ok</v-btn>
                </v-date-picker>
              </v-dialog>

              <v-select
                name="account"
                label="Conta"
                prepend-icon="mdi-bank"
                :items="accounts"
                item-text="description"
                item-value="id"
                v-model="record.accountId"
              >
                <v-list-item
                  slot="prepend-item"
                  rippl
                  @click="add('account')"
                >
                  <v-list-item-action>
                    <v-icon :color="color">mdi-bank-plus</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Nova conta</v-list-item-title>
                </v-list-item>
                <v-divider
                  slot="prepend-item"
                  class="mt-2"
                ></v-divider>
              </v-select>
              <v-select
                name="category"
                label="Categoria"
                prepend-icon="mdi-square-inc"
                :items="categories"
                item-text="description"
                item-value="id"
                v-model="record.categoryId"
              >
                <v-list-item
                  slot="prepend-item"
                  rippl
                  @click="add('category')"
                >
                  <v-list-item-action>
                    <v-icon :color="color">mdi-playlist-plus</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>Nova categoria</v-list-item-title>
                </v-list-item>
                <v-divider
                  slot="prepend-item"
                  class="mt-2"
                ></v-divider>
              </v-select>
              <v-text-field
                name="decription"
                label="Descrição"
                prepend-icon="mdi-library-books"
                v-model.trim="$v.record.description.$model"
              ></v-text-field>
              <v-text-field
                v-show="showTagsInput"
                name="tags"
                label="Tags( separadas po virgula)"
                prepend-icon="mdi-label"
                v-model.trim="record.tags"
              ></v-text-field>
              <v-text-field
                v-show="showNoteInput"
                name="note"
                label="Observação"
                prepend-icon="mdi-note"
                v-model.trim="record.note"
              ></v-text-field>
            </v-form>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  small
                  class="mr-3"
                  v-on="on"
                  @click="showTagsInput = !showTagsInput"
                >
                  <v-icon :color="color">mdi-tag</v-icon>
                </v-btn>
              </template>
              <span>Adicionar tgs</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  small
                  v-on="on"
                  @click="showNoteInput = !showNoteInput"
                >
                  <v-icon :color="color">mdi-label</v-icon>
                </v-btn>
              </template>
              <span>Adicionar uma Anotação</span>
            </v-tooltip>
          </v-card-text>
        </v-card>

        <v-btn
          title="Voltar"
          color="secondary"
          large
          fab
          class="mt-4"
          @click="$router.back()"
        >
          <v-icon color="error">mdi-close</v-icon>
        </v-btn>
        <v-btn
          title="Confirmar"
          :color="color"
          large
          fab
          class="mt-4 ml-4"
          @click="submit"
          :disabled="$v.$invalid"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>

        <v-dialog
          v-model="showAccountCategoryDialog"
          max-width="350px"
          transition="scale-transition"
          origin="top"
        >

          <AccountCategoryAdd
            v-if="showAccountCategoryDialog"
            :entity="entity"
            @close="showAccountCategoryDialog = false"
          />

        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import { decimal, minLength, required } from 'vuelidate/lib/validators'
import moment from 'moment'
import NumericDisplay from './../components/NumericDisplay'
import AccountCategoryAdd from './../components/AccountCategoryAdd'
import AccountsServices from './../services/accounts-service'
import CategoriesService from './../services/categories-service'
import RecordsService from './../services/records-service'

export default {
  name: 'RecordsAdd',
  components: {
    NumericDisplay,
    AccountCategoryAdd
  },
  data () {
    return {
      accounts: [],
      categories: [],
      dateDialogValue: moment().format('YYYY-MM-DD'),
      entity: '',
      record: {
        type: this.$route.query.type.toUpperCase(),
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accountId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
      },
      showAccountCategoryDialog: false,
      showDateDialog: false,
      showTagsInput: false,
      showNoteInput: false
    }
  },
  validations: {
    record: {
      type: { required },
      amount: { required, decimal, different: value => value !== 0 },
      date: { required },
      accountId: { required },
      categoryId: { required },
      description: { required, minLegth: minLength(6) }
    }
  },
  computed: {
    color () {
      switch (this.record.type) {
        case 'CREDIT':
          return 'primary'
        case 'DEBIT':
          return 'error'
        default:
          return 'primary'
      }
    },
    formatedDate () {
      return moment(this.record.date).format('DD/MM/YYYY')
    }
  },
  async created () {
    this.changeTitle(this.$route.query.type)
    this.accounts = await AccountsServices.accounts()
    this.categories = await CategoriesService.categories({ operation: this.$route.query.type })
    // console.log(this.accounts)
    // console.log(this.categories)
  },
  async beforeRouteUpdate (to, from, next) {
    const { type } = to.query
    this.changeTitle(type)
    this.record.type = type.toUpperCase()
    this.record.categoryId = ''
    this.categories = await CategoriesService.categories({ operation: type })
    next()
  },
  methods: {
    ...mapActions(['setTitle']),
    add (entity) {
      this.showAccountCategoryDialog = true
      this.entity = entity
    },
    cancelDateDialog () {
      this.showDateDialog = false
      this.dateDialogValue = this.record.date
    },
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Nova Receita'
          break
        case 'debit':
          title = 'Nova Despesa'
          break

        default:
          title = 'Novo lançamento'
          break
      }
      this.setTitle({ title })
    },
    async submit () {
      try {
        await RecordsService.createRecord(this.record)
        this.$router.push('/dashboard/records')
      } catch (error) {
        console.log('Error ao submeter o formulario', error)
      }
    }
  }

}
</script>
