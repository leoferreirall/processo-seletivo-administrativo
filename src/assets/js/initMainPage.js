"use strict";

var App = {
    initMainPage: function () {
        $('body').Layout();
        $('[data-toggle="push-menu"]').PushMenu('init');
        $('[data-widget="treeview"]').Treeview('init');
        $('.sidebar').overlayScrollbars({});
    }
}