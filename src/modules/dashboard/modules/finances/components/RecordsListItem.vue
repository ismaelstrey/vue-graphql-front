<template>
  <v-list-item>

    <v-list-item-avatar>
      <v-icon :class="[recordIconColor(record.type), 'lighten-1 white--text']">{{ recordIcon(record.type)}}</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        {{record.descriprion}}
      </v-list-item-title>
      <v-list-item-title>
        {{record.category.description}} || {{record.account.description}}
      </v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <span :class="amountColor(record.amount)">{{ formatCurrency(record.amount) }}</span>
    </v-list-item-action>

  </v-list-item>
</template>

<script>
import formatCurrencyMixin from '@/mixins/format-currency'

export default {
  name: 'RecordsListItem',
  mixins: [
    formatCurrencyMixin
  ],
  props: {
    record: Object
  },
  methods: {
    amountColor (amount) {
      return amount < 0
        ? 'error--text text--lighten-1'
        : 'primary--text text--ligthen-1'
    },

    recordIcon (type) {
      return type === 'CREDIT' ? 'mdi-arrow-up-circle-outline' : 'mdi-arrow-down-bold-circle-outline'
    },

    recordIconColor (type) {
      return type === 'CREDIT' ? 'primary' : 'error'
    }
  }
}
</script>
