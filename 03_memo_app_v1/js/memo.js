"use strict"

window.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage == "undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    }else{
        viewStorage();
        saveLocalStorage();
        delLocalStorage();
        allClearLocalStorage();
        selectTable();
    }
    
    },false
);


2.//保存
function saveLocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e){
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            //値の入力チェック
            if(key =="" || value ==""){
                Swal.fire({
                    title:"Memo app"
                    ,html:"key,Memoいずれも必要です"
                    ,type:"error"
                    ,allowOutsideClick:false
                });
                
                return;
            }else{
                let w_msg = "LocalStorageに\n[" + key + " " + value + "]\nを保存しますか?" ;
                Swal.fire({
                    title:"Memo app"
                    ,html:w_msg
                    ,type:"question"
                    ,showCancelButton:true
                }).then(function(result){

                
                if(result.value === true){
                    localStorage.setItem(key,value);
                    viewStorage();
                    let w_msg = "LocalStorageに\n" + key + value +"\nを保存しました。";
                    Swal.fire({
                        title:"Memo app"
                        ,html:w_msg
                        ,type:"success"
                        ,allowOutsideClick:false
                    });
                    document.getElementById("textKey").value ="";
                    document.getElementById("textMemo").value= "";
                }
        
                });
    
            }
        },false
    )
};
            
        
        
3.//削除
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e){
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");

        let w_cnt = 0;
        w_cnt = selectCheckBox(del);

        if(w_cnt >= 1){
            
            
               Swal.fire({
                    title:"Memo app"
                    ,html:"LocalStorageから選択されている"+ w_cnt + "件を削除(delete)をしますか?"
                    ,type:"question"
                    ,showCancelButton:true
                }).then(function(result){

                
                if(result.value === true){
                
                for(let i = 0; i < chkbox1.length;i++){
                    if(chkbox1[i].checked){
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                    } 
                }                          
                    viewStorage();
                                      
                    Swal.fire({
                        title:"Memo app"
                        ,html:"LocalStorageから" + w_cnt +"件を削除(delete)しました。"
                        ,type:"success"
                        ,allowOutsideClick:false
                    });
                    
                    document.getElementById("textKey").value ="";
                    document.getElementById("textMemo").value= "";
                    
                }});
        }
            
    },false
    
    );
}
4.//全て削除
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            
            Swal.fire({
                title:"Memo app"
                ,html:"LocalStorageのデータ全て削除しますか？"
                ,type:"question"
                ,showCancelButton:true
            }).then(function(result){

                
                if(result.value === true){
           
            
                localStorage.clear();
                viewStorage();

                Swal.fire({
                    title:"Memo app"
                    ,html:"LocalStorageのデータ全て削除しました"
                    ,type:"success"
                    ,allowOutsideClick:false
                });
               
                
                document.getElementById("textKey").value ="";
                document.getElementById("textMemo").value= "";
            }
        })},false
    
    );
};

5.//データ選択
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault;
            selectCheckBox(select);
        },false
    );

}
//テーブルからデータ選択
function selectCheckBox(mode){
    
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for(let i = 0;i < chkbox1.length;i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;       
            }
            
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value= w_textMemo;
    
    
    if(mode === select){
        if(w_cnt === 1){
            return w_cnt;            
        }else{
            Swal.fire({
                title:"Memo app"
                ,html:"1つ選択してください"
                ,type:"error"
                ,allowOutsideClick:false
            });
        }    
    }


    if(mode === del){
        if(w_cnt >= 1){
            return w_cnt;
        }else{
            Swal.fire({
                title:"Memo app"
                ,html:"１つ以上選択してください"
                ,type:"error"
                ,allowOutsideClick:false
            });           
        }
    }
}


function viewStorage(){
    const list = document.getElementById("list");

    while(list.rows[0])list.deleteRow(0);

    for(let i = 0;i < localStorage.length;i++){
        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='chkbox1'type ='checkBox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    $("#table1").tablesorter({
        sortList:[[1,0]]
    });
    $("#table1").trigger("update");
}

            
