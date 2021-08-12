$(document).ready(function () {
    $.fn.ajaxage = function (checkedfiltres) {
        q = $('#form-search input.mdl-textfield__input').val();
        stringcheckedfiltres = "";
        if (!jQuery.isEmptyObject(checkedfiltres))
            stringcheckedfiltres = checkedfiltres.join(",")

        $.ajax({
            url: "donnees/get_data.php",
            data: {"q": q, "checkedfiltres": stringcheckedfiltres},
            dataType: "json",
            type: "GET",
            beforeSend: function () {
                $("div.content").hide();
                componentHandler.upgradeElement(document.getElementsByClassName('mdl-spinner')[0])
                $(".loader").show();
            },
            error: function (request, error) {
                $(".loader").hide();
                alert("Erreur : responseText: " + request.responseText);
            },
            success: function (response) {
                $(".loader").hide();
                $("div.content").show();
                var aff = "";
                for (var i = 0; i < response.length; i++) {
                    aff += "<div class='mdl-card mdl-shadow--2dp animated fadeInRight ";
                    aff += "'> <div class='mdl-card__title mdl-card--expand mdl-card--border ";
                    if (response[i]["photo"] != "")
                        aff += "hoverbeerimg";
                    aff += "' style='";
                    if (response[i]["photo"] == "")
                        aff += "background: url(\"ressources/img/question.png\") bottom 61% right 24% no-repeat rgb(76, 175, 80);background-size: 80px";
                    else
                        aff += "background: url(\"ressources/img/" + response[i]["photo"] + ".jpg\") center / cover;";
                    aff += "'>"
                    if (response[i]["photo"] != "") {
                        aff += "<span class='labelimgbeer' style='display:none;'>" + response[i]["photo"] + "</span>";
                        aff += "<img class='imghoverbeer' style='display:none;' onerror=\"this.style.visibility='hidden'\" src='ressources/img/" + response[i]["photo"] + "_back.jpg'/>";
                    }
                    if (response[i]["pays"] != "") {
                        $.ajax({
                            url: 'ressources/img/' + response[i]["pays"] + '.png',
                            type: 'HEAD',
                            error: function () {
                                console.error("ATTENTION, il manque l'image du pays: " + this.url)
                            }
                        });
                        aff += "<img class='img-pays' src='ressources/img/" + response[i]["pays"] + ".png' />";
                    }
                    aff += "<div class='tagName'data-tagname='";
                    aff += response[i]["nom"].replace(/'/g, "&#39");
                    aff += "'></div></div>";
                    aff += "<div class='mdl-card__supporting-text mdl-card--expand'>";
                    aff += response[i]["description"];
                    aff += "</div>";
                    var tabtag = response[i]["tags"].split(",");
                    if (tabtag[0] != "") {
                        aff += "<div class='mdl-card__supporting-text tagdiv'>";
                        for (var j = 0; j < tabtag.length; j++) {
                            aff += "<div class='tag'>";
                            aff += tabtag[j].replace(/'/g, "&#39");
                            aff += "</div>";
                        }
                        aff += "</div>"
                    }

                    aff += "<div class='mdl-card__actions mdl-card--border'>";
                    aff += "<span class='span-infos'>"
                    aff2 = "";
                    if (response[i]["couleur"] != "") {
                        if (aff2 != "") aff2 += " - ";
                        aff2 += response[i]["couleur"];
                    }
                    if (response[i]["variete"] != "") {
                        if (aff2 != "") aff2 += " - ";
                        aff2 += response[i]["variete"];
                    }
                    if (response[i]["degre"] != "") {
                        if (aff2 != "") aff2 += " - ";
                        aff2 += response[i]["degre"] + "º";
                    }
                    if (response[i]["date"] != "") {
                        if (aff2 != "") aff2 += " - ";
                        aff2 += response[i]["date"];
                    }
                    aff += aff2;
                    aff += "</span>"
                    if (response[i]["note"] != "") {
                        aff += "<div class='star-ratings-css'><div class='star-ratings-css-top' style='width:";
                        aff += response[i]["note"];
                        aff += "%'><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div> <div class='star-ratings-css-bottom'><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div></div>";
                    }
                    aff += "</div></div>";
                }


                $("div.content").html(aff);
                $("#nbbeer").html(response.length + " Bières");
                componentHandler.upgradeDom();
                $('.hoverbeerimg').hover(
                    function () {
                        $(this).find(".imghoverbeer").fadeIn(200);
                    }, function () {
                        $(this).find(".imghoverbeer").fadeOut(200);
                    }
                );
            }
        });
    };

    $("#form-search").submit(function (e) {
        var checkedfiltres = new Array();
        $('body').ajaxage(checkedfiltres);
        return false;
    });
    var checkedfiltres = new Array();
    $('body').ajaxage(checkedfiltres);


});

// Pour les select box
$(document).ready(function () {
    "use strict";
    var pluginName = "selectionator";
    var defaults = {
        propertyName: "selectionator",
        src: null,
        orgElement: null,
        checkedItems: [],
        // custom callback events
        onError: function (error) {
        }
    };

    function Plugin(element, options) {
        this.element = element;
        this.selector = null;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            console.log("options: ", this.options);
            var that = this;
            var self = $(that.element);
            that.options.src = that.element.getAttribute('data-src');
            that.selector = that.createFromJson(that.options.data);
            that.options.orgElement = that.element.parentNode.replaceChild(that.selector, that.element);
            $(that.selector).addClass(that._name);
        },
        createFromJson: function (options) {
            var that = this;
            var select = document.createElement('select');
            var popup = document.createElement('div');
            var header = document.createElement('div');
            var search = document.createElement('span');
            var overlay = document.createElement('span');
            overlay.className = 'overlay';
            var shadow = document.createElement('span');
            shadow.className = 'shadow';
            var placeholder = document.createTextNode('Filtres');
            search.className = 'search';
            search.appendChild(shadow);
            search.appendChild(overlay);
            search.appendChild(placeholder);
            popup.appendChild(search);
            var menu = document.createElement('ul');
            select.style.display = 'none';
            menu.className = 'list';
            var box = document.createElement('div');
            box.className = 'menu';
            box.appendChild(menu);
            popup.appendChild(box);
            console.log("optgroup", options.optgroups);
            options.optgroups.forEach(function (optgroup, index) {


                var menuItem = document.createElement('li');
                //menuItem.className('header');
                var header = document.createElement('span');
                header.className = 'header';
                var caption = document.createTextNode(optgroup.label);
                header.appendChild(caption);
                menuItem.appendChild(header);
                var menuItems = document.createElement('ul');
                menuItems.className = 'optgroup';
                menuItem.appendChild(menuItems);
                menu.appendChild(menuItem);

                optgroup.options.forEach(function (option, index) {
                    var opt = new Option(option.text, option.value, option.defaultSelected, option.selected);
                    select.options.add(opt);
                    var item = document.createElement('li');
                    var label = document.createElement('label');
                    label.setAttribute("for", option.value);
                    var checkbox = document.createElement('input');
                    $(checkbox).data(option);
                    checkbox.setAttribute('type', 'checkbox');

                    checkbox.addEventListener('change', function (event) {
                        var checkbox = event.target;
                        var $el = $(event.srcElement);
                        that.options.checkedItems = new Array();
                        that.options.checkedItems = $("input[type=checkbox]:checked");
                        if (that.options.checkedItems.length != 0)
                            placeholder.nodeValue = that.options.checkedItems.length + " / " + $(that.selector).find('input[type="checkbox"]').length;
                        else
                            placeholder.nodeValue = 'Filtres';

                        var checkedfiltres = Array();
                        for (var i = 0; i < that.options.checkedItems.length; i++) {
                            checkedfiltres[i] = that.options.checkedItems[i].labels[0].innerHTML;
                        }
                        $('body').ajaxage(checkedfiltres);

                    });
                    checkbox.id = option.value;
                    var caption = document.createTextNode(option.text);
                    label.appendChild(caption);
                    item.appendChild(checkbox);
                    item.appendChild(label);
                    menuItems.appendChild(item);
                });
            });
            return popup;
        },
        onAddFriend: function (data) {
            var that = this;
            return that.options.onAddFriend(that, data);
        },
        onRemoveFriend: function (data) {
            var that = this;
            var self = $(that.element);
            return that.options.onRemoveFriend(data);
        },
        destroy: function () {
            var that = this;
            $(that.element).unbind("destroyed", that.teardown);
            that.teardown();
        },
        teardown: function () {
            var that = this;
            $(that.element).removeClass(that._name);
            $(that.selector).replaceWith(that.options.orgElement);
            $(that.element).removeData(that._name);
            that.unbind();
            that.element = null;
        },
        bind: function () {
        },
        unbind: function () {
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };
});

//Attach plugin to all matching element
$(document).ready(function () {
    $.ajax({
        url: "donnees/get_selectbox.php",
        dataType: "json",
        type: "GET",
        error: function (request, error) {
            alert("Erreur : responseText: " + request.responseText);
        },
        success: function (response) {
            var datatab = new Object();
            datatab.optgroups = new Array();
            for (var i = 0; i < response.length; i++) {
                datatab.optgroups[i] = new Object();
                if (i == 0) datatab.optgroups[i].label = "Couleur";
                if (i == 1) datatab.optgroups[i].label = "Variété";
                if (i == 2) datatab.optgroups[i].label = "Degré";
                if (i == 3) datatab.optgroups[i].label = "Date";
                if (i == 4) datatab.optgroups[i].label = "Pays";

                datatab.optgroups[i].options = new Array();
                for (var j = 0; j < response[i].length; j++) {
                    datatab.optgroups[i].options[j] = new Object();
                    datatab.optgroups[i].options[j].value = "" + i + j;
                    datatab.optgroups[i].options[j].text = response[i][j];
                    datatab.optgroups[i].options[j].defaultSelected = true;
                    datatab.optgroups[i].options[j].selected = false;
                }
            }
            $('#select').selectionator({
                data: datatab
            });
        }
    });
    setTimeout(function () {
        $(".selectionator").addClass('opened');
    }, 500);
    setTimeout(function () {
        $(".selectionator").removeClass('opened');
    }, 1250);
});