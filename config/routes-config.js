const routesConfig = {
  /**
   * Prefix and Common Middleare for routes
   */
  auth: {
    prefix: 'auth',
    middleware: [],
  },

  gender: {
    prefix: 'genders',
    middleware: ['auth.jwt'],
  },

  contact: {
    prefix: 'contacts',
    middleware: ['auth.jwt'],
    emails: {
      prefix: '',
      middleware: [],
    },
    numbers: {
      prefix: '',
      middleware: [],
    },
  },
}

module.exports = routesConfig
