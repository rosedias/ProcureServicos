<div class="container row">
    <div class="col s12 perfil">
        <img src="<?= $professional['address_picture'] . $professional['name_picture'] ?>" class="col s4">
        <div class="simple-data col s8">
            <div class="identifier col s9">
                <strong><span><?= $professional['name'] ?></span></strong>
                <span><?= $professional['email'] ?></span>
                <span class="flex-center">

                    <?php
                        if ($professional['invoice']) {
                    ?>
                            Nota Fiscal: <i class="material-icons teal-text">check_circle</i>
                    <?php
                        } else {
                    ?>
                            Nota Fiscal: <i class="material-icons teal-text">block</i>
                    <?php
                        }
                    ?>
                </span>
            </div>
            <div class="icon col s3">
                <i class="small material-icons teal-text">verified_user</i>
            </div>
        </div>
    </div>
    <div class="col s12 info-professional col s12">
        <a class="waves-effect waves-light btn modal-trigger red darken-1 col s4" href="#modal1">Contratar</a>

        <div id="modal1" class="modal">
            <div class="modal-content">
                <?php if($this->session->has_userdata('login')) { ?>
                    <h4>Informações para o profissional</h4>

                    <div class="row">
                        <?php echo form_open('ServiceController/insert'); ?>
                            <div class="input-field col s12 m12" id="type_time">
                                <?php
                                $options = [
                                    '0' => 'Atendimento Programado',
                                    '1' => 'Atendimento Urgente(agora)',
                                ];

                                echo form_dropdown('type_time', $options);
                                ?>
                            </div>
                            <?php
                                echo form_hidden([
                                    "professional" => $this->input->get('id')
                                ]);
                            ?>
                            <div class="input-field col s6 m6 l6">
                                <?php
                                    echo form_label("Data:", 'date', 'class="active"');
                                    echo form_input([
                                        "name" => 'date',
                                        "id" => 'date',
                                        "class" => 'validate',
                                        "type" => 'date'
                                    ]);
                                ?>
                            </div>
                            <div class="input-field col s6 m6 l6">
                                <?php
                                    echo form_label("Hora:", 'time', 'class="active"');
                                    echo form_input([
                                        "name" => 'time',
                                        "id" => 'time',
                                        "class" => 'validate',
                                        "type" => 'time'
                                    ]);
                                ?>
                            </div>
                            <div class="input-field col s12 m12 l12">
                                <?php
                                    echo form_label("Descrição:", 'description');
                                    echo form_textarea([
                                        "name" => 'description',
                                        "id" => 'textarea1',
                                        "class" => 'materialize-textarea'
                                    ]);
                                ?>
                            </div>

                            <div class="modal-footer">
                                <?php
                                    echo form_button([
                                        "class" => "modal-action modal-close waves-effect waves-green btn-flat red darken-1 white-text",
                                        "content" => "Contratar",
                                        "id" => "btn-submit",
                                        "type" => "submit"
                                    ]);
                                ?>
                            </div>
                        <?php echo form_close(); ?>

                    </div>

                <?php } else {?>

                    <h4>Para contratar um profissional, será necessário se logar ou se cadastrar.</h4>

                    <div class="modal-footer">
                        <a href="<?= base_url('LoginController')?>" class="modal-action modal-close waves-effect waves-green btn-flat red darken-1 white-text">Login</a>
                        <a href="<?= base_url('UserController/openForm')?>" class="modal-action modal-close waves-effect waves-green btn-flat red darken-1 white-text">Cadastre-se</a>
                    </div>

                <?php } ?>

            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function(){
        $('.modal').modal();

        $('#textarea1').trigger('autoresize');

    });
</script>

