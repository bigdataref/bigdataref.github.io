$(document).ready(function () {
    $("#search-query").on({
        "keyup": function () {
            document.searchSomething(this.value,false)
        }
    });

    var index = lunr(function () {
        this.field('name', {boost: 100});
        this.field('url', {boost: 20});
        this.field('repoUrl', {boost: 20});
        this.field('companyName', {boost: 80});
        this.field('companyPage', {boost: 10});
        this.field('languagesSupported', {boost: 50});
        this.field('language', {boost: 50});
        this.field('description', {boost: 60});
        this.field('tags', {boost: 100});
    });

    indexJson.map(function (raw, ind) {
        raw.id = ind;
        index.add(raw);
    });

    var $allCards = $(".entry-panel").clone();
    document.searchSomething = function(searchQuery,isLink) {
        if(isLink == undefined){
            $("#search-query").val(searchQuery);
        }
        if (searchQuery.length > 3) {
            var result = index.search(searchQuery);
            if(result.length > 0){
                $(".entry-panel").remove();
                var resultMap = {};
                result.map(function(val){
                    resultMap["entry-"+val.ref] = val.score;
                });

                var $filteredCards = $allCards.filter(function(index,element){
                    if(resultMap[element.id]!= undefined){
                        return element;
                    }
                });

                var $sortedCards = $filteredCards.sort(function(a,b){
                    var scoreA = resultMap[a.id];
                    var scoreB = resultMap[b.id];
                    return scoreB-scoreA;
                });

                $sortedCards.appendTo(".cardsWrapper");

                return;
            }
        }
        $allCards.appendTo(".cardsWrapper");
    }
});