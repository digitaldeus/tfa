$(document).on 'page:change', ->
  NESTED_FORM_CONTAINER_CLASS = '.duplicatable_nested_form_container'
  NESTED_FORM_CLASS = '.duplicatable_nested_form'
  ADD_ENTITY_CLASS = '.duplicate_nested_form'
  ATTR_ID_REGEX = /_[0-9]+_/

  # process any nested forms that we find
  $(NESTED_FORM_CONTAINER_CLASS).each ->
    container = $(this)
    nestedForm = container.find(NESTED_FORM_CLASS).last().clone()

    # process the add new link clicked
    container.find(ADD_ENTITY_CLASS).click (e) ->
      e.preventDefault()

      lastNested = container.find(NESTED_FORM_CLASS).last()
      newForm = $(nestedForm).clone()
      nextAvailableId = lastNested.find('input[id*=_attributes]').first().attr('id')
      nextAvailableIndex = parseInt(nextAvailableId.match(/_([0-9])+_/)[1]) + 1

      $(newForm).find('label').each ->
        oldFor = $(this).attr('for')
        newFor = oldFor.replace ATTR_ID_REGEX, "_#{nextAvailableIndex}_"
        $(this).attr 'for', newFor

      $(newForm).find('select, input').each ->
        oldId = $(this).attr 'id'
        newId = oldId.replace(ATTR_ID_REGEX, "_#{nextAvailableIndex}_")
        $(this).attr 'id', newId

        oldName = $(this).attr 'name'
        newName = oldName.replace(/\[[0-9]+\]/, "[#{nextAvailableIndex}]")
        $(this).attr 'name', newName

      $(newForm).insertAfter(lastNested)

    # process the remove click
    container.find('.destroy_nested_form').click (e) ->
      e.preventDefault()
      parentForm = $(this).parents(NESTED_FORM_CLASS)
      parentForm.hide()
      destroy_input = parentForm.find('input[type=hidden][id*=__destroy]')
      destroy_input.val('1')