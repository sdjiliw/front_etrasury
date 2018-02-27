$(document).ready(function(){
  $("#test").css("display", "none");
  function show_lightbox(){
    $('.lightbox_bg').show();
    $('.lightbox_container').show();
  }
  
 $(document).on('click', '#show', function(e){
    e.preventDefault();
    $('.lightbox_content h2').text('Add company');
    $('#form_company button').text('Add company');
    $('#form_company').attr('class', 'form add');
    $('#form_company').attr('data-id', '');
    $('#form_company .field_container label.error').hide();
    $('#form_company .field_container').removeClass('valid').removeClass('error');
    $('#form_company #rank').val('');
    $('#form_company #company_name').val('');
    $('#form_company #industries').val('');
    $('#form_company #revenue').val('');
    $('#form_company #fiscal_year').val('');
    $('#form_company #employees').val('');
    $('#form_company #market_cap').val('');
    $('#form_company #headquarters').val('');
    show_lightbox();
  });

  function show_lightbox(){
    $('#test').show();
  }
  
 $(document).on('click', '#show', function(e){
    e.preventDefault();
    $('#test2 h2').text('AJOUTER ENTREPRISE');
    $('#general_validate button').text('Add company');
    $('#general_validate #nom').val('');
    $('#general_validate #telmobile').val('');
    $('#general_validate #telfixe').val('');
    $('#general_validate #nb_agence').val('');
    $('#general_validate #capital').val('');
    $('#general_validate #localite').val('');
    show_lightbox();
  });
});