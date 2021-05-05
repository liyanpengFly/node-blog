function serializeToJson(form) {
    var result = {}
    var f = form.serializeArray()
    f.forEach(item => {
        result[item.name] = item.value
    });
    return result
}