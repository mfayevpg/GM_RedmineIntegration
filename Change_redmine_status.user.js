// ==UserScript==
// @name        Change redmine status
// @namespace   mfaye@voyageprive.com
// @description Change task status from github into redmine
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     redmine.config.js
// @include     https://github.com/vpg/*/pull/*
// @version     1
// ==/UserScript==


var closeImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4hJREFUeNqck21MW2UUx8997m1v27X3ttDSMmVFHYXROZAtOEJkGKviLJFlL9kySRZj0EQTX8JMNFnEqInxox9YljiZcy9mWzabRbeA22BhkTXsBbKOMcAAIm1pSy+0pff2vjw+7Rx+9yS/D8/JyXP+53+eh8qGQtzC7ZFamqcWzA7uoaaCZl73NDAGE2AKw0okun72fN/nbEZ3xd7S9LO81ipSsgqPg95V6vx4uOvrE4ya87m2bem11D6fQAwLWioFmpRjpwKBT0KHvng3fWPodWNV9YxlU9UdLSsCaFoBtDg55bMlIqC7dGVdfPjuXoqmWLA4QAj9CcnBoQ1/nzjZaSayaJeNoZ2WNQZEg1HHrIKe2tp42Ky3CPTCgil6/FxXamyijSLSBFGD8O8DbebRCbCQc66hcpD31Q+w5U+CyVO+CiptbPjF1Oo/lsgX9d+k5o/8dBBLolfLpLYmA5ffs5G8zlkEZdsaevV6GJWi0yDF51dhGNagFPlfvhC5FzzAjk9Zsxd+2zzjXntcDN4ylQgxu0gko1dfEit37I6yvB1UMQtAwX+xfDcISyNB4+hXXd2DBhseAwO+7uDxkNWAx2gW92/cMD7dF+jAGDtFDYNEjHtMFmNAqiYDIMi632j9rLj9zUCaQaCPLQFKi5C0cLh4z65hvtn3QwQgukgaJiiqQJyApAwgvroKzOufAa7aK7g/aP+Ves6TpUlhkQJQYuapik1b6s2MaSdJ6VUiXSNdC+RXiBVgcDz5aBYmDUo8ocqyrOUvyKOLhSFz8ZKdq6mUjKXunBKPgzWzBDJRt7K8AlBXDQxyOYgpGJSJCMx2n96sjjxYQ+kBkkUceSQiZI4e5XlNarI3vXidLbYtojovQIoYSVTkAxUcRbQxfm90v3Dtapseq6B6PMmSzg8HDXv33YhZTcL9np6PJo/1/JhOJPcAQlbGZCRNH62CAfIic5HwjvDZU91ibI5bMlhX3O0dh1zbmw8L7km6wlu5O3bm7MH5gWv+ufGH/mdn3jnprKv9TlfseEAuwoyaXIbIzVuNf13u4/JzG3f6vy95reUIyCkNK4pW1vzCKY63Bm01obfDf/S/f/vLb/ebNtZsd7W8MlZGYYkBUQaVZi+mKrz1Lp6be6LF9w0CTcGqVpgzl/9UijpZ/taBTz2dHeJ0/9XWyPDUfWE2mkmd69VR+F8z/m/8I8AAk6Kca9YlLQ4AAAAASUVORK5CYII=';
var loadingGif = 'data:image/gif;base64,R0lGODlhLQAmAOZPAP///0VFRUSlTfj8+f3+/UinUE6qV1mvYd3v38LixVuwY/v9/KbUq225dODw4uTy5fX69er169rt22m3cV+yZ37BhKrWrvH48snly53Qof7//szmzne+fpLLmLHZtIvHkUuoU7vevqPTqM/o0vv9+/z+/HS8eo/JlJXMmsXjyPn8+Wa1bXC6d/f7+Ljdu/7+/r7gwoXEirTbuPz+/WO0avb69vb793q/gYjGjvz9/PP59O737/r9+t/v4K7YsqDRpKXUqbXcuZrPn2i2b3O7eubz5/n8+vX69vj8+M3n0Pr9+9zu3Y/JlVKsWtHp1P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAABPACwAAAAALQAmAAAH/4AAgoOEhYaHiImKi4yNjo+QkYIOMDIYEZKZAwwHAp6eEwmZjw4KngYcJzGdAhUDo4sOIAIFIguEGzQCDa+whwOmBwi/NwIdvocMtMOIAxQFzMiDpjiLCcbSgxKeI4sLBhTZgtcCF4wNArfZIZ69iibl4hieD4wKBeIAEZ4eiw+7+QBMEHBAHaIPAkQETOHpQ6JrBiAEBFDBEwdMhTwUEBBiIoABLE5lGCFBAoMVnjJ4HGRh1qdPBlysJPQABSsBExhInMmzp8+fQIMKChCJKFFkRx8lRVooQFKnR6ECMOp0kNRGS6MSMjp0qlevWrFu7Tq1qlauYMkyytr1bNuvaBeXKoJqNupVqXGHmk3bM6zQsn8DC/YVCAAh+QQFCgBPACwWAAMABwAFAAAHE4AIAIOEFoSEG4cAGooAQIo+AoEAIfkEBQoATwAsGwAGAAUABgAABw2AADkAhCqEh4iJioiBACH5BAUKAE8ALBsADAAFAAYAAAcOgACCg4SFhQ6EBRw8goEAIfkEBQoATwAsFwAQAAcABQAABxGAAIIAJIOGAAQRhwAVixSLgQAh+QQFCgBPACwOAA4ACgAHAAAHFoANPzsAhYaHiImKhwSLM4clhxCLioEAIfkEBQoATwAsAAAAAAEAAQAABwOAT4EAIfkEBQoATwAsDQAIAAQABwAABxKATylPhAAPQQQAiouMjYo2LYEAIfkEBQoATwAsDgAEAAYABgAABxaAAIIEACaDghYAL4IAPBqMkJE6JIyBACH5BAUKAE8ALBMAAwADAAQAAAcLgAAABIIANYIlgoEAIfkEBQoATwAsFgADAAcABQAABx2AMhgRT4VPAogTCYUnMQeIFUqGGzQNPIZPRkdPgQAh+QQFCgBPACwaAAUABgAHAAAHH4BPTwOCggINhIM3Ah2FAxQFCIUJjIULBhSFT0InBIEAIfkEBQoATwAsGwALAAUABwAABx+AT08NAguCJgIXggoFgg8CDYIfAiJPLSwGEIJPPYKBACH5BAUKAE8ALBcAEAAHAAUAAAccgACCAAkCBoMeBQIhKgwrAgIZgk2GLoMoDBCDgQAh+QQFCgBPACwSABEABwAEAAAHF4BPSE+EhAtDGSMSEk8eAo+QRSgHkBOBACH5BAUKAE8ALA4ADgAGAAcAAAcigE87S0+FTAIHC4UpAgIfhU8VjRwRTwMsjQaQFiCQhQ9PgQAh+QQFCgBPACwNAAkABAAHAAAHGoBPRD4DEgICTgmHFyGHAxiHDxGHHk8TT0+BACH5BAUKAE8ALA4ABAAGAAcAAAchgE+CAymCTw4KBRGHIAIFSQMKAgcITwyOlU+SOIaCI4aBADs=';
var redmineIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAPxQTFRFAAAA/wAAfwAAAAAA/wAA5AAM4wAM4wAM5AAMvwAA3AcA3QsA3QoA4gAL4wAN4wAM3QoA3AsA4AoA3AoA3AsA3AsA4gAF4wAL5AAL3AkA3QsA3QsA4wkAzAAA/wAA3goA3AsA/wAA3QsA3QsAxAAAygAAywAAzAAA4QcA2wUAywAAywAAzAAAzQAAzAAAygAAygAAzAAAvwAAzAAAywAAzAAA1AAAywAAywAAzQAAoQAAoAAApgAAyQAAxgAAoQAAoQAAoAAAoQAAoQAAoQAAoQAAogAAogAAogAAogAAoAAAogAAoAAAoQAAoQAA3QwA3QsAzAAAogAA////Ghi28QAAAE90Uk5TAAICAQS41dOpBEnrNY3VbUvmMTP76TZwcTv57xsFA4NgAYn7DXXkaSIxfPJQOOEiTboUfe7WBvvebKxsFC82HnU29oCWk/5rjMaH01FyvOgmDFMAAAABYktHRFN6Zx0GAAAACXBIWXMAAABIAAAASABGyWs+AAAAlElEQVQY02NgwAEYmZB5zCysbOwcDJwwPhc3Dy8fH7+AoBCELyziLyomLiEp5S8tA+LLyskHKABpRSVlBZAmFVU1dQ2wSkVNLW0dBgZdvcBAfYheg8BAQwYGI2MTU6jhZuYWlgwMVtY2tjDr7OwdHBmcgoKcYQIuQUGuDG5BQe4wAY+gIE8GL29vH5iAr7e3HwPpAAC4nBIFtEJwqAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0wOS0xOVQxNTo1MDo1NiswMjowMKD5w/0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMDMtMTZUMjI6MzU6NDErMDE6MDAPFRk1AAAAAElFTkSuQmCC';

function closeDemand(currentDemand, currentHTMLObject) {
    var url = redmine.url + 'issues/' + currentDemand + '.json';
    GM_xmlhttpRequest(
        {
            method: "PUT",
            url: url,
            data: '{"issue":{"status_id": 5}}',
            headers: {
                "Content-Type": "application/json",
                "X-Redmine-API-Key": redmine.APIKey
            },
            onload: function (response) {
                if (response.status == 200) {
                    currentHTMLObject.parent().css('text-decoration', 'line-through')
                    currentHTMLObject.hide();
                }
            }
        });
}

function getRedmineStatus(issueId) {
    var url = redmine.url + 'issues/' + issueId + '.json';
    console.log(url);
    GM_xmlhttpRequest(
        {
            method: "GET",
            url: url,
            onload: function (response) {
//                console.log(response.responseText);
                issueObject = eval('(' + response.responseText + ')');
                issueObject = issueObject.issue;
                var inputId = '#point_' + issueObject.id;
                $(inputId).attr('value', response.responseText);
                $(inputId).trigger('change');
            },
            headers: {
                "Content-Type": "application/json",
                "X-Redmine-API-Key": redmine.APIKey
            }
        });
}

function getMainIssueData(issueId) {
    var url = redmine.url + 'issues/' + issueId + '.json?include=children';
    GM_xmlhttpRequest(
        {
            method: "GET",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "X-Redmine-API-Key": redmine.APIKey
            },
            onload: function (response) {
                alert(response.responseText);
            }
        });
}

/**
 *
 * MAIN
 *
 */

$(document).ready(function () {

    var regExp = new RegExp("[refs|fixes] ?#?([0-9]+)");
//    getMainIssueData($('.discussion-topic-title').text().replace('Point ', ''));
    var issueObjectHash = {};
    issueObjectHash.keyList = [];
    var nbSpottedIssues = 0;
    var nbRetrievedFromRedmine = 0;
    $('body').append('<input type="hidden" id="fireHtmlUpdate" value="" />');
    $('a[class="message"]:visible').each(function () {
        var currentMessage = $(this).text();
        var result = regExp.exec(currentMessage);
        if (result != null && result.length == 2) {
            if (typeof(issueObjectHash[result[1]]) == 'undefined') {
                console.log("Spotted [" + result[1] + "]");
                nbSpottedIssues++;
                var inputId = 'point_' + result[1];
                issueObjectHash.keyList.push(result[1]);
                issueObjectHash[result[1]] = {
                    inputId: inputId,
                    issueObject: null,
                    jQueryWrapperList: [$(this)]
                };
                $('body').append('<input type="hidden" id="' + inputId + '" name="' + inputId + '" value="" />');
                $('#' + inputId).change(function () {
                    if (typeof($(this).attr('value')) && ($(this).attr('value') != 'undefined')) {
                        issueObjectHash[result[1]].issueObject = eval('(' + $(this).attr('value') + ')').issue;
                        nbRetrievedFromRedmine++;
                        if (nbRetrievedFromRedmine == nbSpottedIssues) {
                            $('#fireHtmlUpdate').trigger('change');
                        }
                    }
                });
                getRedmineStatus(result[1]);
            } else {
                issueObjectHash[result[1]].jQueryWrapperList.push($(this));
            }
        }
    });
    $('#fireHtmlUpdate').change(function () {
        var keyLength = issueObjectHash.keyList.length;
        for (var i = 0; i < keyLength; i++) {
            var currentKey = issueObjectHash.keyList[i];
            if (issueObjectHash[currentKey].issueObject != null) {
                var jQueryWrapperListLength = issueObjectHash[currentKey].jQueryWrapperList.length;
                for (var j = 0; j < jQueryWrapperListLength; j++) {
                    var currentJQuery = issueObjectHash[currentKey].jQueryWrapperList[j];
                    var linkId = 'closeDemand_' + currentKey + '_' + j;
                    var linkHtml = '<span style="font-size: 6px; float: left; width: 88px;">';
                    linkHtml += '<a href="' + redmine.url + 'issues/' + currentKey + '" alt="Voir la demande dans Redmine" title="Voir la demande dans Redmine" target="_blank"><img src="' + redmineIcon + '" /></a>&nbsp;';
                    linkHtml += '<span style="float: right;">';
                    if (issueObjectHash[currentKey].issueObject.status.id == 16) {
                        linkHtml += '<a href="#" id="' + linkId + '" alt="Fermer la demande" title="Fermer la demande"><img id="img' + linkId + '" src="' + closeImg + '"/></a>&nbsp;';
                    } else {
                        linkHtml += issueObjectHash[currentKey].issueObject.status.name;
                    }
                    linkHtml += '</span></span>';
                    currentJQuery.parent().prepend(linkHtml);
                    if (issueObjectHash[currentKey].issueObject.status.id == 5) {
                        currentJQuery.css('text-decoration', 'line-through');
                    }
                }
            } else {
                console.log('[' + currentKey + '] seem NOK');
            }
        }
    });


    console.log('Nombre de points vus dans le merge : [' + issueObjectHash.keyList.length + ']');
    $('a[id^=closeDemand_]').click(function (event) {
        event.preventDefault();
        closeDemand($(this).attr('rel'), $(this));
    });
    $('span[class="commit-ref js-selectable-text css-truncate expandable"]').each(function () {
        var cleanBranchName = $(this).text().replace(/\s+/g, '');
        $(this).wrapInner('<a href="https://github.com/vpg/dev_vp_bong/tree/' + cleanBranchName + '" target="_blank"></a>')
    });

});
