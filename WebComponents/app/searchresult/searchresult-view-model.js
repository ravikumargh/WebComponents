define(function (require) {
    'use strict';
    var ko = require('knockout-2.2.0'),
    
    pagerView = require('text!./pager.html');

    var testdata = {
        "paging": { "page": 1, "per_page": 5, "total": 13 },
        "data": [
                { "entityKey": "64253032662", "familyKey": "64253028944", "familyCaption": "RR_TEST RR_TEST familyCaption relationshipCaptions RR_TEST familyCaption relationshipCaptions", "itemID": " & &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032663", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": " &123 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032664", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": " &234 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032665", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": " &343 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032666", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": " &455 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032667", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": " &7857 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032668", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": "2 & &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032669", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": "23 & &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032670", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": "aas &12 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032671", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": "sed &34 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032672", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": "test &53 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032673", "familyKey": "64253028944", "familyCaption": "RR_TEST", "itemID": "test1 &331 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] },
                { "entityKey": "64253032674", "familyKey": "64253028944", "familyCaption": "RR_TEST familyCaption relationshipCaptions", "itemID": "test2 &332 &", "relationshipKeys": [], "relationshipCaptions": [], "score": 3.43795681, "action": "", "searchActions": [] }
        ]
    };


    ko.bindingHandlers.miSearchResultProperty = {
        createNodes: function miSearchResultProperty_createNodes(rootElement, options) {
            if (options.data === undefined || options.data === null) {
                return;
            }
            var view = ko.bindingHandlers.miSearchResultProperty.readerView(options);
            document.body.insertAdjacentHTML('beforeend', view);

            ko.applyBindingsToNode(rootElement, { template: { name: 'mi-search-tmpl' + options.id } }, options);
        },
        init: function miSearchResultProperty_init(element, valueAccessor) {

            var options = ko.utils.unwrapObservable(testdata),
                paging = options.paging,
                data = options.data;

            options.id = ko.bindingHandlers.miSearchResultProperty.getGuid();
            options.perPage = ko.observable(paging.per_page);
            options.perPage.subscribe(function miSearchResultProperty_perPage(newValue) {
                newValue = (newValue === "") ? 1 : newValue;
                options.numberOfPages(ko.bindingHandlers.miSearchResultProperty.numberOfPages(paging.total, newValue));
                //options.perPage(newValue);
            });
            options.numberOfPages = ko.observable(ko.bindingHandlers.miSearchResultProperty.numberOfPages(paging.total, paging.per_page));
            options.currentPage = ko.observable(paging.page);
            options.totalRecord = ko.observable(paging.total);
            options.contacts = ko.observableArray(data);
            options.currentPageData = ko.computed(function () {
                var pagesize = parseInt(options.perPage(), 10),
                startIndex = pagesize * (options.currentPage() - 1),
                endIndex = startIndex + pagesize;
                return options.contacts.slice(startIndex, endIndex);
            });
            options.next = function miSearchResultProperty_next() {
                var i = options.currentPage();
                if (i === options.numberOfPages()) {
                    return;
                }
                i++;
                options.currentPage(i);
            };
            options.previous = function miSearchResultProperty_previous() {
                var i = options.currentPage();
                if (i === 1) {
                    return;
                }
                i--;
                options.currentPage(i);
            };
            options.first = function miSearchResultProperty_first() {
                options.currentPage(1);
            };
            options.last = function miSearchResultProperty_last() {
                options.currentPage(options.numberOfPages());
            };
            options.updatePageSize = function miSearchResultProperty_updatePageSize(data, event) {
                if (event.keyCode === 13) {
                    console.log(data);
                    options.numberOfPages(ko.bindingHandlers.miSearchResultProperty.numberOfPages(paging.total, options.perPage()));
                } else if (!$.isNumeric(String.fromCharCode(event.keyCode))) {
                    return false;
                }
                return true;
            };
            ko.bindingHandlers.miSearchResultProperty.createNodes(element, options);

            return { controlsDescendantBindings: true };
        },
        numberOfPages: function miSearchResultProperty_numberOfPages(totalRecords, perPage) {
            var numPages = 0;
            perPage = (perPage === "") ? 1 : perPage;

            if (totalRecords !== null && perPage !== null) {
                numPages = Math.ceil(totalRecords / perPage);
            }
            return numPages;
        },
        readerView: function miSearchResultProperty_readerView(options) {
            //var data =  options.data ;

            var HTMLstr = '<script id="mi-search-tmpl' + options.id + '" type="text/html"><div> <div  class="search-container">';
            HTMLstr += '<div class="header block-group">';
            if (options.data.length === 0) {
                HTMLstr += "No search result.";
                HTMLstr += '</div>';
            } else {
                for (var header in options.data[0]) {
                    HTMLstr += '<div class="item block">' + header + '</div>';
                }

                HTMLstr += '</div>';
                HTMLstr += '<div  data-bind="foreach: currentPageData">';
                HTMLstr += '<div class="block-group"  >';

                for (var fieldValue in options.data[0]) {
                    HTMLstr += '<div class="item block" data-bind="text: ' + fieldValue + '"> </div>';
                }
                HTMLstr += '</div>';
                HTMLstr += '</div> </div> ';

                if (options.data.length !== 0) {
                    HTMLstr += pagerView;
                }
            }
            HTMLstr += '</div></script>';

            return HTMLstr;
        },
        getGuid: function miSearchResultProperty_getGuid() {
            return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                    this.s4() + '-' + this.s4() + this.s4() + this.s4();
        },
        s4: function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
        }

    };


    var miSearchProto = Object.create(HTMLElement.prototype);

    document.registerElement('mi-search-result', {
        prototype: miSearchProto
    });

});