document.observe('dom:loaded', function() {
    
    var hideSidebarItemsForPhones = function(selector) {
        var sidebarItems = $$(selector);
        sidebarItems.each(function(item, index) {
            if(index > 0) {
                item.toggleClassName('hidden-phone');
            }
        });        
    }
    
    hideSidebarItemsForPhones('.col-left > div');
    hideSidebarItemsForPhones('.col-right > div');
    
    var moreTranslation = Translator.translate('more');
    var lessTranslation = Translator.translate('less');
    
    var sidebarShowMore = $('sidebar-show-more');
    
    if(sidebarShowMore) {
        sidebarShowMore.observe('click', function(ev) {
            hideSidebarItemsForPhones('.col-left > div');
            hideSidebarItemsForPhones('.col-right > div');
            
            /**
             * @todo check for availability of Translator Object
             */
            this.innerHTML = this.innerHTML  == lessTranslation ? moreTranslation : lessTranslation;
        });
    }
    
    //navbar toggle navigation visibility
    var navbarCollapsible;
    $$('.navbar .btn-navbar').each(function(navbarButton) {
        navbarButton.observe('click', function(e) {
//            new Event(e).stop();
            navbarCollapsible = navbarButton.up('.container').select('.nav-collapse')[0];
            
            navbarCollapsible.setStyle({
                height: (parseInt(navbarCollapsible.getStyle('height')) == 0 ? 'auto' : 0)
            });
        });
    });

    //categories modal box
    if($('categories-show-modal') && $('category-nav')) {
        var categoryNavigation = $('category-nav');
        $('categories-show-modal').observe('click', function(ev) {
            categoryNavigation
                .addClassName('modal')
                .addClassName('active');
        });
    }

    // pager modifications
    $$('div.pager').each(function(pager){
        pager.removeClassName('pager'); // because it intersects with Twitter Bootstrap "pager" class
        var clone = document.createElement('p');
        clone.update(pager.children[0].innerText);
        clone.addClassName('amount');
        var clearer = document.createElement('div');
        clearer.setAttribute('style', 'clear:both');
        pager.children[0].remove();
        pager.insert(clone);
        pager.insert(clearer);
    });
    $$('div.pages').each(function(item) {
        item.addClassName('pagination');
    });
    $$('div.pagination > ol').each(function(item){ // Getting pager OL object. May be one, two or none.
        item.cleanWhitespace();
        /*
         * If first element has no children it means if is the current selected page
         * and we have to add disabled "previous" button for Magento. Else we just
         * replace Magento image arrow with a text arrow
         */
        if(!item.firstChild.childElementCount) {
            var prevLi = document.createElement('li');
            prevLi.update('<a href="#">&laquo;</a>');
            prevLi.addClassName('disabled');
            item.insertBefore(prevLi, item.firstChild);
        }else{
            item.firstChild.children[0].update('&laquo;');
        }

        /*
         * Same for the "next" button
         */
        if(!item.lastChild.childElementCount) {
            var nextLi = document.createElement('li');
            nextLi.update('<a href="#">&raquo;</a>');
            nextLi.addClassName('disabled');
            item.insert(nextLi);
        }else{
            item.lastChild.children[0].update('&raquo;');
        }
    });
    $$('div.sorter').each(function(item){
        var clearer = document.createElement('div');
        clearer.setAttribute('style', 'clear:both');
        item.insert(clearer);
    });
    $$('p.view-mode').each(function(viewModeP) {
        viewModeP.cleanWhitespace();
        viewModeP.addClassName('pagination');
        var newEl = document.createElement('ul');
        viewModeP.childElements().each(function(item, index) {
            if(index){
                var newLi = document.createElement('li');
                if(item.tagName == 'STRONG') {
                    newLi.addClassName('active');
                    newLi.update('<a href="#">' + item.innerText + '</a>');
                }else{
                    newLi.update(item.outerHTML);
                }
                newEl.insert(newLi);
            }
            item.remove();
        });
        viewModeP.insert(newEl);
    });

    // products grid modifications
    $$('ul.products-grid').each(function(grid){
        grid.addClassName('row');
        grid.childElements().each(function(item){
            item.addClassName('span2');
        });
    });
});
