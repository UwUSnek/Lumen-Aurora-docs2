

var ui_syntax_hover = {
    add_tooltip : function(e, text) {
        // Create tooltip container
        var tooltip_c = document.createElement("div");
        tooltip_c.classList.add("syntax-hover-tooltip-container");

        // Create main tooltip element
        var tooltip = document.createElement("div");
        tooltip.classList.add("syntax-hover-tooltip");
        tooltip_c.appendChild(tooltip);

        // Create arrow background
        var tooltip_arrow = document.createElement("div");
        tooltip_arrow.classList.add("syntax-hover-tooltip-arrow");
        tooltip.appendChild(tooltip_arrow);

        // Create arrow border
        var tooltip_arrow_b = document.createElement("div");
        tooltip_arrow_b.classList.add("syntax-hover-tooltip-arrow-border");
        tooltip.appendChild(tooltip_arrow_b);


        // Add the specified text as HTML, append the container to the syntax block element and start the opacity transition
        tooltip.innerHTML += '<p style="margin: 0px;">' + text + '</p>';
        e.appendChild(tooltip_c);
        //! Forcibly flush pending style changes. This stops the opacity change from being calculated in this round and thus skipped
        window.getComputedStyle(tooltip).opacity; 
        tooltip.style.opacity = 1;
    },



    f_vbtm : function(e) { ui_syntax_hover.add_tooltip(
        e.target,
        "<b>Verbatim block</b><br>" +
        "This block identifies code that must be written exactly as shown here."
    );},
    f_any : function(e) { ui_syntax_hover.add_tooltip(
        e.target,
        "<b>Name block</b><br>" +
        "This block identifies a valid user-defined name."
    );},
    f_sub : function(e) { ui_syntax_hover.add_tooltip(
        e.target,
        "<b>Sub-element block</b><br>" +
        "This block identifies a sub-element whose syntax is specified somewhere else in the documentation."
    );},
    f_decl : function(e) { ui_syntax_hover.add_tooltip(
        e.target,
        "<b>Declaration block</b><br>" +
        "This block identifies a symbol declaration."
    );},
    f_sgr : function(e) { ui_syntax_hover.add_tooltip(
        e.target,
        "<b>//TODO block</b><br>" +
        "//TODO."
    );},
    f_expr : function(e) { ui_syntax_hover.add_tooltip(
        e.target,
        "<b>Expression block</b><br>" +
        "This block identifies an expression. Square brackets [] indicate that the expression must be of that specific type."
    );},
    f_path : function(e) { ui_syntax_hover.add_tooltip(
        e.target,
        "<b>Path block</b><br>" +
        "This block identifies a symbol path."
    );},




    on_move: function(e){
        //! "this" assumes the value of the original element this event was attached to. e.target is the innermost and cannot be used in this case
        var tooltip = this.getElementsByClassName("syntax-hover-tooltip-container")[0].getElementsByClassName("syntax-hover-tooltip")[0];
        var parent_rect = this.getBoundingClientRect();
        var halfW = tooltip.getBoundingClientRect().width / 2;

        tooltip.style.top  = '' + (parent_rect.top + parent_rect.height) + 'px';
        tooltip.style.left = '' + (e.pageX - halfW) + 'px';
    },




    on_leave : function(e){
        var container = e.target.getElementsByClassName("syntax-hover-tooltip-container")[0];
        var tooltip = container.getElementsByClassName("syntax-hover-tooltip")[0];

        tooltip.style.opacity = 0;
        setTimeout(function(){ container.remove(); }, parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue("--syntax-hover-tooltip-opacity-duration")) * 1000);
    },
    




    init : function(){
        // Verbatim. Literally what the element contains
        { let e = document.getElementsByTagName("S-VBTM-"); for(let i = 0; i < e.length; ++i) {
            e[i].addEventListener("mouseenter", ui_syntax_hover.f_vbtm);
            e[i].addEventListener("mouseleave", ui_syntax_hover.on_leave);
            e[i].addEventListener("mousemove",  ui_syntax_hover.on_move);
        }} 

        // User defined sequence of characters
        { let e = document.getElementsByTagName("S-ANY-");  for(let i = 0; i < e.length; ++i) {
            e[i].addEventListener("mouseenter", ui_syntax_hover.f_any);
            e[i].addEventListener("mouseleave", ui_syntax_hover.on_leave);
            e[i].addEventListener("mousemove",  ui_syntax_hover.on_move);
        }} 

        // Sub element
        { let e = document.getElementsByTagName("S-SUB-");  for(let i = 0; i < e.length; ++i) {
            e[i].addEventListener("mouseenter", ui_syntax_hover.f_sub);
            e[i].addEventListener("mouseleave", ui_syntax_hover.on_leave);
            e[i].addEventListener("mousemove",  ui_syntax_hover.on_move);
        }} 

        // Declaration
        { let e = document.getElementsByTagName("S-DECL-"); for(let i = 0; i < e.length; ++i) {
            e[i].addEventListener("mouseenter", ui_syntax_hover.f_decl);
            e[i].addEventListener("mouseleave", ui_syntax_hover.on_leave);
            e[i].addEventListener("mousemove",  ui_syntax_hover.on_move);
        }} 
        
        // Syntactic sugar
        { let e = document.getElementsByTagName("S-SGR-");  for(let i = 0; i < e.length; ++i) {
            e[i].addEventListener("mouseenter", ui_syntax_hover.f_sgr);
            e[i].addEventListener("mouseleave", ui_syntax_hover.on_leave);
            e[i].addEventListener("mousemove",  ui_syntax_hover.on_move);
        }} 

        // Expression
        { let e = document.getElementsByTagName("S-EXPR-"); for(let i = 0; i < e.length; ++i) {
            e[i].addEventListener("mouseenter", ui_syntax_hover.f_expr);
            e[i].addEventListener("mouseleave", ui_syntax_hover.on_leave);
            e[i].addEventListener("mousemove",  ui_syntax_hover.on_move);
        }} 

        // Symbol path
        { let e = document.getElementsByTagName("S-PATH-"); for(let i = 0; i < e.length; ++i) {
            e[i].addEventListener("mouseenter", ui_syntax_hover.f_path);
            e[i].addEventListener("mouseleave", ui_syntax_hover.on_leave);
            e[i].addEventListener("mousemove",  ui_syntax_hover.on_move);
        }} 
    }
}