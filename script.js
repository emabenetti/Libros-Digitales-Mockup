//Seccion TopNav, incluye logo y titulo

var TopNav = {
    el: "#general",
    data: {
        title: 'Libros Digitales',
        hasSearch: false,
        logo: {
            src: 'https://natalfwk-pre.gruposancorseguros.com/2.3.1/media/grupo_sancor.svg',
            alt: 'Logo Grupo Sancor'
        },
        hasFavorites: false,
        favorites: [],
        currentMonth: null,
        filteredEvents: [],

        //WIZARD DE TABS
        wizard: {
            type: NF.Wizard.Type.TABS,
            activeStep: 0,
            mode: NF.Wizard.Mode.FREE,
            validationMode: NF.Wizard.ValidationMode.NEVER,

            // Configuración de cada uno de los pasos del Wizard
            steps: [

                /**
                 * Paso 1
                 */
                {
                    displayName: 'Guardar Registro',
                    content: '#step1',

                    viewModel: {
                        data: function () {
                            return {
                                nombre: '',
                                apellido: '',
                                email: ''
                            }
                        },
                        methods: {
                            validate: function () {
                                return NF.Validation.Form.validate('#libros');
                            }
                        },
                        busEvents: {
                            'get-name': function () {
                                this.Bus.$emit(
                                    'name',
                                    this.nombre + ' ' + this.apellido
                                );
                            }
                        }
                    },

                    onInit: function (config) {
                        console.log("onInit Step1");
                    },

                    onEnter: function (config, direction) {
                        console.log("onEnter Step1", direction);
                        console.log(config);
                    },

                    onExit: function (config, direction) {
                        console.log("onExit Step1", direction);
                        console.log(config);
                    },

                    validate: function (config, direction) {
                        console.log("validate Step1", direction);
                        console.log(config);
                        // Si el tab no se visitó nunca el view model no se crea
                        // consideramos que el paso no es valido
                        if (!(config.viewModel instanceof Vue)) {
                            return false;
                        }

                        return config.viewModel.validate();
                    }
                },

                /**
                 * Paso 2
                 */
                {
                    displayName: 'Busqueda de Registros',
                    content: '#step2',
                    viewModel: {
                        data: {
                            cumple: '2011-05-20T00:00:00',
                            sexo: [{
                                name: 'Masculino',
                                checked: false
                            }, {
                                name: 'Femenino',
                                checked: false
                            }]
                        },
                        methods: {
                            validate: function () {
                                return NF.Validation.Form.validate('#libros');
                            }
                        }
                    },

                    onInit: function (config) {
                        console.log("onInit Step2");
                    },

                    onEnter: function (config, direction) {
                        console.log("onEnter Step2", direction);
                        console.log(config);
                    },

                    onExit: function (config, direction) {
                        console.log("onExit Step2", direction);
                        console.log(config);
                    },

                    validate: function (config, direction) {
                        console.log("validate Step2", direction);
                        // Si el tab no se visitó nunca el view model no se crea
                        // consideramos que el paso no es valido
                        if (!(config.viewModel instanceof Vue)) {
                            return false;
                        }
                        return config.viewModel.validate();
                    }
                },

                /**
                 * Paso 3
                 */
/*                 {
                    displayName: 'Crear tu usuario',
                    content: '#step3',
                    viewModel: {
                        data: {
                            nombreCompleto: ''
                        },
                        busEvents: {
                            'name': function (nombreCompleto) {
                                this.nombreCompleto = nombreCompleto;
                            }
                        }
                    },

                    onInit: function (config) {
                        console.log("onInit Step3");
                    },

                    onEnter: function (config, direction) {
                        console.log("onEnter Step3", direction);
                        console.log(config);
                    },

                    onExit: function (config, direction) {
                        console.log("onExit Step3", direction);
                        console.log(config);
                    },

                    validate: function (config, direction) {
                        if (direction !== "backward") {
                            return $.ajax({
                                url: 'https://nf-services.gruposancorseguros.com/validate/business/ok'
                            }).done(function() {
                                alert('Se ha creado la cuenta !!');
                            });
                        }
                        return true;
                    }
                } */
            ]
        }

    },
    methods: {
        //WIZARD DE TABS
        onInit: function (config) {
            console.log("onInit general del Wizard");
        },

        onEnterStep: function (currentStep, nextStep) {
            console.log("onEnterStep general del Wizard");
        },

        onFinish: function (config) {
            console.log("onFinish general del Wizard");
        }

    },
        //DATEPICKER
        // Observamos el comportamiento de las variables
        watch: {
        'currentMonth': function (val, oldVal) {
            this.filterEvents(val);
        }
    }
}

// Instanciamos el View Model
var tn = new NF(TopNav)