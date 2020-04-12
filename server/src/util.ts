/*
 * @Author: your name
 * @Date: 2020-03-29 11:52:31
 * @LastEditTime: 2020-04-12 12:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \DevUIHelper\src\util.ts
 */
import{MarkupKind,CompletionItemKind, MarkupContent, CompletionItem} from 'vscode-languageserver';
export function getName(text: string,componentRegex: RegExp){
    text.match(componentRegex);
    const n = RegExp.$1.substring(2);
    // const nam = n.replace(n[0],n[0].toUpperCase());//匹配之后对字符串处理然后匹配导出的模块
    const nam = n;//匹配之后对字符串处理然后匹配导出的模块
    let name: string;
    if (nam.indexOf("-") !== -1){
        name = capitalize(nam);
    }else{
        name = nam;
    }
    // console.log("name: " + name);
    return name;

}
// export function getAttrName(text:string):string|undefined{
//     if(text.startsWith("[")){
//         return text.match(/\[(\S*)\]/)!.toString().toLowerCase();
//     }
//     if(text.startsWith("(")){
//         return text.match(/\((\S*)\)/)!.toString().toLowerCase();
//     }
//     else{
//         return text;
//     }
// }
export function word2Name(word: string){
    const n  = word.substring(2);
    const nam = n.replace(n[0],n[0].toUpperCase());//匹配之后对字符串处理然后匹配导出的模块
    let name: string;
    if (nam.indexOf("-") !== -1){
        name = capitalize(nam);
    }else{
        name = nam;
    }
    return name;
}
function capitalize(string: string){
    // split() 方法用于把一个字符串分割成字符串数组。
    var words =string.split("-");
    for(var i=0;i<words.length;i++)
    {
        // charAt() 方法可返回指定位置的字符。
        // slice() 方法可从已有的数组中返回选定的元素。
        words[i]=words[i].charAt(0).toUpperCase() + words[i].slice(1);
        // 第一个单词的第一个字母转化为大写，然后再将该单词的后面字母使用slice()接上即可。
    }
    // join() 方法用于把数组中的所有元素放入一个字符串
    return words.join("");
}
export function autoIcon(type:CompletionItemKind):string{
    switch(type){
        default:
            return "$(array)";
    }
}
export function converStringToName(name:string):string{
    let bananaset = ['[',']','(',')']
    for(let banana of bananaset){
        name = name.replace(banana,"");
    }
    return name;
}
//c1=>c2
export function copyCompletionItem(c1:CompletionItem,c2:CompletionItem){
    c2.insertText=c1.insertText;
    c2.kind=c1.kind;
    c2.detail=c1.detail;
    c2.documentation = c1.documentation;
                
}
export class MarkUpBuilder{
    private markUpContent:MarkupContent;
    constructor(){
        this.markUpContent=  {kind:MarkupKind.Markdown,value:""}
    }
    
    getMarkUpContent():MarkupContent{
        return this.markUpContent;
    }
    addContent(content:string){
        this.markUpContent.value+=content;
        return this;
    }
    addSpecialContent(type:string,content:string[]){
        this.markUpContent.value+= 
             [
                '```'+type,
                 ...content,
                '```'
            ].join('\n');
        return this;
    }


}
