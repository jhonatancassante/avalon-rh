export const editUserFields = [
    {
        name: "completeName",
        label: "Nome Completo",
        tooltip:
            "Verifique e digite seu nome completo, caso seja o mesmo da conta Google, não precisa alterar.",
        placeholder: "Digite o nome completo",
        type: "text",
        disabled: false,
    },
    {
        name: "socialName",
        label: "Nome Social",
        tooltip:
            "Verifique e digite seu nome social, caso não tenha, utilize o seu nome completo no lugar.",
        placeholder: "Digite o nome social",
        type: "text",
        disabled: false,
    },
    {
        name: "nickname",
        label: "Apelido",
        tooltip: "Digite seu apelido, caso não tenha, utilize o primeiro nome.",
        placeholder: "Digite o apelido",
        type: "text",
        disabled: false,
    },
    {
        name: "birthdate",
        label: "Data de Nascimento",
        tooltip:
            "Coloque sua data de nascimento, lembrando que precisa ter 18 anos para participar como staff.",
        placeholder: "",
        type: "date",
        disabled: false,
    },
    {
        name: "email",
        label: "Email do Google Acount",
        tooltip:
            "Seu email viculado a sua conta do Google. Não pode ser alterado!",
        placeholder: "",
        type: "text",
        disabled: true,
    },
    {
        name: "contactEmail",
        label: "Email de Contato",
        tooltip:
            "Verifique e digite seu email, caso seja o mesmo da conta Google, não precisa alterar.",
        placeholder: "Digite o email de contato",
        type: "text",
        disabled: false,
    },
];
