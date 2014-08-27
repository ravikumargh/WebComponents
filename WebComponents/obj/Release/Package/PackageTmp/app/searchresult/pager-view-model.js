var mi = {};
mi.Pager = function myfunction() {
    this.perPage = 3;
    this.currentPage = 1;
    this.totalRecords = 13;

    this.numberOfPages = function () {
        var numPages = 0;
        if (this.totalRecords !== null && this.perPage !== null) {
            numPages = Math.ceil(this.totalRecords / this.perPage)
        }
        return numPages;
    };
    this.showPage = function (page) {
        //this.currentPage = page;
        //var html = '';

        //this.paragraphs.slice((page - 1) * this.paragraphsPerPage,
        //    ((page - 1) * this.paragraphsPerPage) + this.paragraphsPerPage).each(function () {
        //        html += '<div>' + $(this).html() + '</div>';
        //    });

        //$(this.pagingContainerPath).html(html);

        //renderControls(this.pagingControlsContainer, this.currentPage, this.numPages());
    }
    var renderControls = function (container, currentPage, numPages) {
        var pagingControls = 'Page: <ul>';
        for (var i = 1; i <= numPages; i++) {
            if (i != currentPage) {
                pagingControls += '<li><a href="#" onclick="pager.showPage(' + i + '); return false;">' + i + '</a></li>';
            } else {
                pagingControls += '<li>' + i + '</li>';
            }
        }

        pagingControls += '</ul>';

        $(container).html(pagingControls);
    }

}