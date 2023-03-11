const testForm = {
    requestName: 'haefeli',
    steps: [
        {
            label: 'Persönliche Daten',
            stepId: 'personal',
            display: true,
            rows: [
                {
                    elements:[
                        {
                            type: 'text',
                            placeholder: 'Vorname',
                            required: true,
                            autocomplete: 'given-name',
                            label: 'Name *',
                            name: 'surname',
                        },
                        {
                            type: 'text',
                            placeholder: 'Nachname',
                            required: true,
                            autocomplete: 'family-name',
                            label: 'Nachname *',
                            name: 'name',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'email',
                            placeholder: 'max.muster@company.com',
                            required: true,
                            autocomplete: 'email',
                            label: 'E-Mail *',
                            name: 'email',
                        },
                    ]
                },
                {
                    elements: [
                        {
                            type: 'tel',
                            placeholder: '+41 00 000 00 00',
                            required: true,
                            autocomplete: 'tel',
                            label: 'Telefonnummer *',
                            name: 'telefon',
                        },
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht oder Bemerkung',
                            required: false,
                            label: 'Nachricht',
                            name: 'nachricht',
                        },
                    ]
                }, 
                {
                    elements: [
                        {
                            type: 'radio',
                            name: 'umzugsTyp',
                            title: 'Art des Umzugs',
                            options: [
                                {
                                    id: 'privatumzug',
                                    required: true,
                                    label: 'Privatumzug',
                                    value: false,
                                    action: 'toggleSteps(["auszugsort","einzugsort"],["auszugsortFirma","einzugsortFirma"])'
                                },
                                {
                                    id: 'firmenumzug',
                                    required: false,
                                    label: 'Firmenumzug',
                                    value: false,
                                    action: 'toggleSteps(["auszugsortFirma","einzugsortFirma"],["auszugsort","einzugsort"])'
                                },
                                {
                                    id: 'keinUmzug',
                                    required: false,
                                    label: 'Kein Umzug',
                                    value: false,
                                    action: 'toggleSteps([""],["auszugsortFirma","einzugsortFirma","auszugsort","einzugsort"])'
                                },
                            ]
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'checkbox',
                            name: 'weitereAngebote',
                            title: 'Weitere Leistungen',
                            options: [
                                {
                                    id: 'reinigung',
                                    label: 'Reinigung',
                                    value: false,
                                    action: 'toggleSteps(["reinigung"],[""])'
                                },
                                {
                                    id: 'lagerung',
                                    label: 'Lagerung',
                                    value: false,
                                    action: 'toggleSteps(["lagerung"],[""])'
                                },
                                {
                                    id: 'treppensteiger',
                                    label: 'Treppensteiger',
                                    value: false,
                                    action: 'toggleSteps(["treppensteiger"],[""])'
                                },
                                {
                                    id: 'moebellift',
                                    label: 'Möbellift',
                                    value: false,
                                    action: 'toggleSteps(["moebellift"],[""])'
                                },
                                {
                                    id: 'entsorgung',
                                    label: 'Entsorgung',
                                    value: false,
                                    action: 'toggleSteps(["entsorgung"],[""])'
                                },
                            ]
                        }
                    ]
                },
            ]
        },
        {
            label: 'Auszugsort',
            stepId: 'auszugsort',
            display: false,
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Musterstrasse',
                            required: false,
                            label: 'Strasse',
                            name: 'auszug_strasse',
                        },
                        {
                            type: 'text',
                            placeholder: 'Hausnummer',
                            required: false,
                            label: 'Hausnummer',
                            name: 'auszug_hausnummer',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Adresszusatz',
                            required: false,
                            label: 'Adresszusatz',
                            name: 'auszug_adresszusatz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Ort',
                            required: false,
                            label: 'Ort',
                            name: 'auszug_ort',
                        },
                        {
                            type: 'text',
                            placeholder: '0000',
                            required: false,
                            label: 'PLZ',
                            name: 'auszug_plz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '2.5 Zimmer',
                            required: false,
                            label: 'Anzahl der Räume',
                            name: 'auszug_anzahl_räume',
                        },
                        {
                            type: 'text',
                            placeholder: '100 m²',
                            required: false,
                            label: 'Gesamtfläche',
                            name: 'auszug_gesamtfläche',
                        },
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Etage',
                            required: false,
                            label: 'Etage',
                            name: 'auszug_etage',
                        },
                        {
                            type: 'text',
                            placeholder: 'Personen',
                            required: false,
                            label: 'Anzahl der umziehenden Personen',
                            name: 'auszug_personen',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Der Umzug wird bezahlt von',
                            name: 'auszug_bezahlung',
                        },
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'gewünschtes Datum Auszug',
                            name: 'auszug_datum',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'auszug_bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Einzugsort',
            stepId: 'einzugsort',
            display: false,
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Musterstrasse',
                            required: false,
                            label: 'Strasse',
                            name: 'einzug_strasse',
                        },
                        {
                            type: 'text',
                            placeholder: 'Hausnummer',
                            required: false,
                            label: 'Hausnummer',
                            name: 'einzug_hausnummer',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Adresszusatz',
                            required: false,
                            label: 'Adresszusatz',
                            name: 'einzug_adresszusatz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Ort',
                            required: false,
                            label: 'Ort',
                            name: 'einzug_ort',
                        },
                        {
                            type: 'text',
                            placeholder: '0000',
                            required: false,
                            label: 'PLZ',
                            name: 'einzug_plz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '2.5 Zimmer',
                            required: false,
                            label: 'Anzahl der Räume',
                            name: 'einzug_anzahl_räume',
                        },
                        {
                            type: 'text',
                            placeholder: '100 m²',
                            required: false,
                            label: 'Gesamtfläche',
                            name: 'einzug_gesamtfläche',
                        },
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Etage',
                            required: false,
                            label: 'Etage',
                            name: 'einzug_etage',
                        },
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'gewünschtes Datum Einzug',
                            name: 'einzug_datum',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'einzug_bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Auszugsort Firma',
            stepId: 'auszugsortFirma',
            display: false,
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Musterstrasse',
                            required: false,
                            label: 'Strasse',
                            name: 'strasse',
                        },
                        {
                            type: 'text',
                            placeholder: 'Hausnummer',
                            required: false,
                            label: 'Hausnummer',
                            name: 'hausnummer',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Adresszusatz',
                            required: false,
                            label: 'Adresszusatz',
                            name: 'adresszusatz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Ort',
                            required: false,
                            label: 'Ort',
                            name: 'ort',
                        },
                        {
                            type: 'text',
                            placeholder: 'PLZ',
                            required: false,
                            label: 'PLZ',
                            name: 'plz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Etage',
                            required: false,
                            label: 'Etage',
                            name: 'etage',
                        },
                        {
                            type: 'text',
                            placeholder: '2.5 Zimmer',
                            required: false,
                            label: 'Anzahl der Räume',
                            name: 'raeume',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '100 m²',
                            required: false,
                            label: 'Gesamtfläche',
                            name: 'etage',
                        },
                        {
                            type: 'text',
                            placeholder: 'Personen',
                            required: false,
                            label: 'Anzahl der umziehenden Personen',
                            name: 'personen',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'gewünschtes Datum Auszug',
                            name: 'auszugsdatum',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Einzugsort Firma',
            stepId: 'einzugsortFirma',
            display: false,
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Musterstrasse',
                            required: false,
                            label: 'Strasse',
                            name: 'strasse',
                        },
                        {
                            type: 'text',
                            placeholder: 'Hausnummer',
                            required: false,
                            label: 'Hausnummer',
                            name: 'hausnummer',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Adresszusatz',
                            required: false,
                            label: 'Adresszusatz',
                            name: 'adresszusatz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Ort',
                            required: false,
                            label: 'Ort',
                            name: 'ort',
                        },
                        {
                            type: 'text',
                            placeholder: 'PLZ',
                            required: false,
                            label: 'PLZ',
                            name: 'plz',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Etage',
                            required: false,
                            label: 'Etage',
                            name: 'etage',
                        },
                        {
                            type: 'text',
                            placeholder: '2.5 Zimmer',
                            required: false,
                            label: 'Anzahl der Räume',
                            name: 'raeume',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '100 m²',
                            required: false,
                            label: 'Gesamtfläche',
                            name: 'etage',
                        },
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'gewünschtes Datum Auszug',
                            name: 'auszugsdatum',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Reinigung',
            stepId: 'reinigung',
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Reinigungstermin',
                            name: 'reinigungstermin',
                        },
                        {
                            type: 'text',
                            placeholder: '07:30 Uhr',
                            required: false,
                            label: 'Uhrzeit',
                            name: 'reinigungstermin uhrzeit',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Abgabetermin',
                            name: 'abgabetermin',
                        },
                        {
                            type: 'text',
                            placeholder: '14:00 Uhr',
                            required: false,
                            label: 'Uhrzeit',
                            name: 'abgabetermin uhrzeit',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '100 m²',
                            required: false,
                            label: 'Gesamtfläche',
                            name: 'etage',
                        },
                        {
                            type: 'text',
                            placeholder: '2.5 Zimmer',
                            required: false,
                            label: 'Anzahl der Räume',
                            name: 'raeume',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Lagerung',
            stepId: 'lagerung',
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Lagerungs Beginn',
                            name: 'lagerungsbeginn',
                        },
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Voraussichtliches Lagerungs Ende',
                            name: 'lagerungs ende',
                        },
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '10m³',
                            required: false,
                            label: 'Volumen',
                            name: 'volumen',
                        },
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Treppensteiger',
            stepId: 'treppensteiger',
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Miete Beginn',
                            name: 'mietebeginn',
                        },
                        {
                            type: 'text',
                            placeholder: '07:30 Uhr',
                            required: false,
                            label: 'Uhrzeit',
                            name: 'miete beginn uhrzeit',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Miete Ende',
                            name: 'mieteende',
                        },
                        {
                            type: 'text',
                            placeholder: '14:00 Uhr',
                            required: false,
                            label: 'Uhrzeit',
                            name: 'miete ende uhrzeit',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '2',
                            required: false,
                            label: 'Anzahl benötigter Helfer',
                            name: 'helfer',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Möbellift',
            stepId: 'moebellift',
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Miete Beginn',
                            name: 'miete beginn',
                        },
                        {
                            type: 'text',
                            placeholder: '07:30 Uhr',
                            required: false,
                            label: 'Uhrzeit',
                            name: 'miete beginn uhrzeit',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Miete Ende',
                            name: 'miete ende',
                        },
                        {
                            type: 'text',
                            placeholder: '14:00 Uhr',
                            required: false,
                            label: 'Uhrzeit',
                            name: 'miete ende uhrzeit',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'mind. 1',
                            required: false,
                            label: 'Anzahl benötigter Helfer',
                            name: 'helfer',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'bemerkung',
                        }
                    ]
                },
            ]
        },
        {
            label: 'Entsorgung',
            stepId: 'entsorgung',
            rows: [
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'dd.mm.yyyy',
                            required: false,
                            label: 'Entsorgung Termin',
                            name: 'entsorgung termin',
                        },
                        {
                            type: 'text',
                            placeholder: '07:30 Uhr',
                            required: false,
                            label: 'Uhrzeit',
                            name: 'entsorgung uhrzeit',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: '10',
                            required: false,
                            label: 'Anzahl der Packstücke',
                            name: 'packstuecke',
                        },
                        {
                            type: 'text',
                            placeholder: '100 kg',
                            required: false,
                            label: 'Gewicht',
                            name: 'gewicht',
                        },
                        {
                            type: 'text',
                            placeholder: '10m³',
                            required: false,
                            label: 'Volumen',
                            name: 'volumen',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Musterstrasse',
                            required: false,
                            label: 'Strasse Abholung',
                            name: 'strasse abholung',
                        },
                        {
                            type: 'text',
                            placeholder: 'Hausnummer',
                            required: false,
                            label: 'Hausnummer Abholung',
                            name: 'hausnummer abholung',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Adresszusatz',
                            required: false,
                            label: 'Adresszusatz Abholung',
                            name: 'adresszusatz abholung',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'text',
                            placeholder: 'Ort',
                            required: false,
                            label: 'Ort Abholung',
                            name: 'ort abholung',
                        },
                        {
                            type: 'text',
                            placeholder: 'PLZ',
                            required: false,
                            label: 'PLZ Abholung',
                            name: 'plz abholung',
                        }
                    ]
                },
                {
                    elements: [
                        {
                            type: 'textarea',
                            placeholder: 'Ihre Nachricht',
                            required: false,
                            label: 'Bemerkung',
                            name: 'bemerkung',
                        }
                    ]
                },
            ]
        }
    ]
};

const geckoForm = new GeckoForm(testForm, '#test-gecko-form', '.wr_btn--submit', '.wr_btn--form-back', '.lyt--form-steps');
geckoForm.buildGeckoForm();