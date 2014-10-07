/**
 * VetBone Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/VetBone
 */

(function(e,t){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?module.exports=t(require("backbone"),require("rivets")):typeof define=="function"&&define.amd?define(["backbone","rivets"],t):e.vetbone=t(e.Backbone,e.rivets)})(this,function(e,t){return function(e,t){function r(e){if(e instanceof Array)return"array";var t=typeof e;if(n.hasOwnProperty(t))return"primitive";if(t==="object")return"object";throw"Invalid data type"}function i(t,n,r,s,o){n instanceof e.Collection?n[t]("add remove reset",s):n instanceof e.Model?n[t]("change:"+r,s):o!==!1&&r&&n.hasOwnProperty(r)&&i(t,n[r],r,s,!1)}function s(t,n){if(t instanceof e.Collection)return t.models;if(t instanceof e.Model)return t.get(n);if(n&&t.hasOwnProperty(n))return t[n]instanceof e.Collection?t[n].models:t[n]}function o(t,n,i,s){t instanceof e.Collection?r(i)==="primitive"?t.add({value:i}):t.add(i):t instanceof e.Model?t.set(n,i):s!==!1&&n&&t.hasOwnProperty(n)&&o(t[n],n,i,!1)}var n={"undefined":!0,"boolean":!0,number:!0,string:!0};t.adapters[":"]={subscribe:function(e,t,n){i("on",e,t,n)},unsubscribe:function(e,t,n){i("off",e,t,n)},read:function(e,t){return s(e,t)},publish:function(e,t,n){o(e,t,n)}}}.apply(this,[e,t])}.bind(this));