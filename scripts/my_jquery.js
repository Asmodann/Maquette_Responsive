function $(element) {
  if (typeof element === "string") {
    var elements = element.split(",");
    var array = [];
    var is_id = false;
    my_while(document, function(data) {
      for (var k = 0; k < elements.length; k++) {
        var current = elements[k].replace(/^\s+|\s+$/, "");
        if (current.match(/^\#(.*)$/)) {
          is_id = true;
          check_id(data, current.substr(1), array);
        } else if (current.match(/^\.(.*)$/)) {
          check_class(data, current.substr(1), array);
        } else if (data.tagName === current.toUpperCase()) {
          array.push(data);
        } else if (current === "*") {
          array.push(data);
        }
      }
    });
    if (is_id) {
      return array[0];
    }
    return array;
  }
}

function id_in_array(data, array) {
  for (var k in array) {
    if (array[k].getAttribute("id") == data.getAttribute("id")) {
      return true;
    }
  }

  return false;
}

function check_id(data, current, array) {
  if (data.getAttribute("id")) {
    if (data.getAttribute("id") === current) {
      if (id_in_array(data, array) === false) {
        array.push(data);
      }
    }
  }
}

function check_class(data, current, array) {
  if (data.getAttribute("class")) {
    if (data.getAttribute("class").match(current)) {
      array.push(data);
    }
  }
}

function my_while(child, cb) {
  if (child.children) {
    child = child.children;
    for (var i = 0; i < child.length; i++) {
      var tmp = child[i];
      if (cb) {
        cb(tmp);
      }
      if (tmp.children) {
        my_while(tmp, cb);
      }
    }
  }
}