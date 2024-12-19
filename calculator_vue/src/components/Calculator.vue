<script setup lang="ts">

import { ref } from 'vue';



var display = ref("0");
var queue = ref("0");
var button_c = ref("C");

var buffer = 0;
var calc_operator = '';
var transition = false;
var calculation_complete = false;
var last_answer = "0";

var history = ref([]);



function clear() {
    if (button_c.value == "CE") {
        button_c.value = "C";
        display.value = "0";
    } else {
        queue.value = "0";
        buffer = 0;
        calc_operator = '';
    }

    if (calculation_complete)
        queue.value = "0";
}

function enter_number(number: Number) {
    if (display.value.length >= 16)
        return;

    button_c.value = "CE";

    if (display.value == "0" || transition) {
        display.value = number.toString();
        transition = false;
    }
    else
        display.value = display.value.concat(number.toString());

    if (calculation_complete) {
        queue.value = "0";
        calculation_complete = false;
    }
}

function period() {
    if (display.value.includes('.'))
        return;

    display.value = display.value.concat('.');
}

function backspace() {
    if (display.value.length > 1) {
        display.value = display.value.substring(0, display.value.length - 1);
        transition = false;
    }
    else
        display.value = "0";
}

function use_answer() {
    display.value = last_answer.toString();

}

function operator(op: string) {
    if (op == '-' && display.value == '0') {
        display.value = '-';
        transition = false;
        return;
    }

    calculation_complete = false;

    calc_operator = op;
    queue.value = display.value.concat(" " + op + " ");
    buffer = Number(display.value);
    transition = true;
}

function equals_button()  {
    last_answer = calculate();
    
    var first  = buffer;
    var second = Number(display.value);

    // add_to_history(first, calc_operator, second, last_answer);
    transition = true;
    calculation_complete = true;
    queue.value = queue.value.concat(display.value.concat(" ="))
    display.value = last_answer.toString();

    add_to_history(first, calc_operator, second, last_answer);

    if (last_answer == "undefined")
        last_answer = "0";
}

function calculate() {
    var first  = buffer;
    var second = Number(display.value);

    if (calc_operator == '/' && second == 0)
        return "undefined";

    var answer = 0;

    switch (calc_operator) {
        case '+': answer = first + second; break;
        case '-': answer = first - second; break;
        case '*': answer = first * second; break;
        case '/': answer = first / second; break;
    }

    return answer.toString();
}

function add_to_history(first:Number, calculator_operator:string, second:Number, answer:String) {
    history.value.push(first.toString() + " " + calculator_operator + " " + second.toString() + " = " + answer);
    return;
}

</script>





<template>
    <div id="calculator" class="calculator">
        <div id="calculator-main" class="calculator-main">
            <label id="calculator-queue" class="calculator-queue">{{ queue }}</label>
            <label id="calculator-display" class="calculator-display">{{ display }}</label>
            <hr>
            <div id="calculator-buttons" class="calculator-buttons">
                <button type="button" class="calculator-button" id="calculator-button-c" v-on:click="clear()">{{ button_c }}</button>
                <button type="button" class="calculator-button" v-on:click="use_answer()">ANS</button>
                <button type="button" class="calculator-button" v-on:click="backspace()">DEL</button>
                <button type="button" class="calculator-button" v-on:click="operator('/')">/</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(7)">7</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(8)">8</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(9)">9</button>
                <button type="button" class="calculator-button" v-on:click="operator('*')">*</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(4)">4</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(5)">5</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(6)">6</button>
                <button type="button" class="calculator-button" v-on:click="operator('-')">-</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(1)">1</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(2)">2</button>
                <button type="button" class="calculator-button" v-on:click="enter_number(3)">3</button>
                <button type="button" class="calculator-button" v-on:click="operator('+')">+</button>
                <button type="button" class="calculator-button"></button>
                <button type="button" class="calculator-button" v-on:click="enter_number(0)">0</button>
                <button type="button" class="calculator-button" v-on:click="period()">.</button>
                <button type="button" class="calculator-button" v-on:click="equals_button()">=</button>
            </div>
        </div>
        <div id="calculator-history" class="calculator-history">
            <ol>
                <li v-for="x in history">{{ x }}</li>
            </ol>
        </div>
    </div>
</template>





<style scoped>
.calculator {
    display: inline;
    padding-left: 2rem;
    justify-content: center;

    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 18px;
}

.calculator-main {
    display: inline;
}

.calculator-queue {
    display: block;
    text-align: right;
    color: grey;
}

.calculator-display {
    display: block;
    font-size: 50px;
    text-align: center;
}

.calculator-buttons {
    display: grid;
    grid-template-rows: 20%;
    grid-template-columns: 25% 25% 25% 25%;
    
    aspect-ratio: 1;
}

.calculator-button {
    font-size: 18px;
}

.calculator-history {
    display: inline;
    background-color: white;
}

</style>
