    const confirm_password = document.getElementById("confirm-password");
    const password = document.getElementById("password");
    const cnpj = document.getElementById("cnpj");
    const submit = document.getElementById("btn-submit");

    $('#cpf').on('blur', function() {
        validCpf();
    });


    $('#confirm-password').on('blur', function() {
        if(confirm_password.value != password.value) {
            $( "#confirm-password, #password" ).removeClass("valid").addClass("invalid");
            submit.setAttribute("disabled","disabled");
        }else{
            $( "#confirm-password, #password" ).removeClass("invalid").addClass("valid");
            submit.setAttribute("enable", "enable");
        }
    });

    function validCpf() {
        $.ajax({
            type: "POST",
            url: "../ValidFormController/getCpf",
            dataType: "json",
            data: {
                "cpf": cpf.value
            },
            success: function(data) {
                if(data.status == false) {
                    $( "#cpf" ).removeClass("valid").addClass("invalid");
                    submit.setAttribute("disabled","disabled");
                }else{
                    $( "#cpf" ).removeClass("invalid").addClass("valid");
                    submit.removeAttribute("disabled","disabled");
                }
            }
        });
    }

    $('#cnpj').on("blur", function () {
        if (cnpj.value != '') {
            validCnpj();
        } else {
            showInvoice();
        }
    });

    function validCnpj() {
        $.ajax({
            type: "POST",
            url: "../ValidFormController/getCnpj",
            dataType: "json",
            data: {
                "cnpj": cnpj.value
            },
            success: function(data) {
                if(data.status == false) {
                    $( "#cnpj" ).removeClass("valid").addClass("invalid");
                    submit.setAttribute("disabled","disabled");
                }else{
                    $( "#cnpj" ).removeClass("invalid").addClass("valid");
                    submit.removeAttribute("disabled","disabled");
                    $('#nota-fiscal').removeClass("hide-content").addClass("show-content");

                }
            }
        });
    }

    function showInvoice() {
        console.log($('#cnpj').hasClass("valid"));
        if(cnpj.value != '' && $('#cnpj').hasClass("valid")) {
            $('#nota-fiscal').removeClass("hide-content").addClass("show-content");
        }else if(cnpj.value == '' || $('#cnpj').hasClass("invalid")) {
            $('#nota-fiscal').removeClass("show-content").addClass("hide-content");
        }
    }

    function clearInputAddress() {
        // Limpa valores do formulário de cep.
        $("#street").val("");
        $("#city").val("");
        $("#country").val("");
    }

    $("#nation, #street, #country, #city").on("change", function(){
       $(this).siblings("label").addClass("active");
    });

    $("#cep").blur(function() {
        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validCep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validCep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#street").val("...").change().attr('readonly', true);
                $("#city").val("...").change().attr('readonly', true);
                $("#country").val("...").change().attr('readonly', true);
                $("#nation").val("Brazil").change().attr('readonly', true);

                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#street").val(dados.logradouro).parent('label').addClass('active');
                        $("#city").val(dados.localidade);
                        $("#country").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        clearInputAddress();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                clearInputAddress();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            clearInputAddress();
        }
    });

    function showCollection() {
        $('#collection-categories').slideToggle();
    }

    $("#js-collection-button").click(function(e) {
        e.preventDefault();

        loadCategories();
        showCollection();
    });

    function catchCategoriesProfessional() {

        var professionalCategories = $('li.categories span');
        var noListCategories = [];
        $(professionalCategories).each(function (i, e) {
            var categories = $(e).text();
            noListCategories.push(categories);
        });

        return noListCategories;
    }

    function loadCategories() {
        var select = $('#loadCategories');

        select.empty();
        $.get("../CategoryController/jsonCategories")
            .done(function (response) {
                response = JSON.parse(response) || {};

                noListCategories = catchCategoriesProfessional();

                select.append($('<option disabled></option>', {value: 0, text: 'Selecione novas categorias'}));
                $.each(response.categories, function(i, e){
                    if ($.inArray(e.category, noListCategories) == -1) {
                        select.append($('<option></option>', {value: e.id, text: e.category}));
                    }
                });

                select.material_select();
            });
    }
