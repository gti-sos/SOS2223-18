<script>
    // @ts-nocheck
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';
        onMount(async () =>{
            getVariations();
        });
        let API = "/api/v1/residential-variations-stats";
        let mensajeUsuario = "";
        let mensajePaginacion = "";
        if(dev)
            API = "http://localhost:3000"+API
            
        let variations = [];
        let newVariationsProvince = "";
        let newVariationsMonth = "";
        let newVariationsImmigrant = "";
        let newVariationsEmigrant= "";
        let newVariationsTotal = "";

        let result = "";
        let resultStatus = "";
        
       // let añoInicio = "";
       // let añoFinal = "";
        let filtroProvincia = "";
        let offsetFiltro = "";
        let limitFiltro = "";

        async function loadData(){
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                mensajeUsuario = "Se han insertado los datos de nuevo";
                getVariations();
            }else{
                mensajeUsuario = "No se han podido insertar los datos de nuevo";
            }
        }
        async function getVariations(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                variations = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        /* async function getPopulationsFiltroAño(){
            resultStatus = result = "";
            if(añoFinal < añoInicio){
                mensajeUsuario = "El año final no puede ser menor que el año de inicio";
                return;
            }else if(isNaN(añoInicio) || isNaN(añoFinal)){
                mensajeUsuario = "El año de inicio y el año final no pueden ser letras";
                return;
            }else if(añoInicio == "" || añoFinal == ""){
                mensajeUsuario = "El año de inicio y el año final no pueden estar vacios";
                return;
            }else if(populations.length == 0){
                mensajeUsuario = "No hay datos para mostrar";
                return;
            }else if(añoInicio <= añoFinal){
                mensajeUsuario = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?from="+añoInicio+"&to="+añoFinal, {
                method: "GET"
            });
            console.log(API+"?from="+añoInicio+"&to="+añoFinal);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                populations = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }*/

        async function getVariationsFiltroProvincia(){
            resultStatus = result = "";
            if(filtroProvincia == ""){
                mensajeUsuario = "La provincia no puede estar vacia";
                return;
            }else if(!isNaN(filtroProvincia)){
                mensajeUsuario = "La provincia no puede ser un número";
                return;
            }else if(populations.length == 0){
                mensajeUsuario = "No hay datos para mostrar";
                return;
            }else if(filtroProvincia){
                mensajeUsuario = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?Province="+filtroProvincia, {
                method: "GET"
            });
            console.log(API+"?Province="+filtroProvincia);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                variations = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        async function getPaginacion(){
            resultStatus = result = "";
            if(offsetFiltro == "" || limitFiltro == ""){
                mensajePaginacion = "Los parámetros no pueden estar vacios";
                return;
            }else if(isNaN(offsetFiltro) || isNaN(limitFiltro)){
                mensajePaginacion = "Los parámetros no pueden ser letras";
                return;
            }else if(limitFiltro <= 0){
                mensajePaginacion = "El límite debe ser superior a 0";
                return;
            }else{
                mensajePaginacion = "Se muestran los datos correspondientes al filtro";
            }
            const res = await fetch(API+"?offset="+offsetFiltro+"&limit="+limitFiltro, {
                method: "GET"
            });
            console.log(API+"?offset="+offsetFiltro+"&limit="+limitFiltro);
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                variations = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        let insertedData = [];
        async function createVariations(){
            resultStatus = result = "";
            const newVariations = {
                Province: newVariationsProvince,
                Month: newVariationsMonth,
                immigrant: parseInt(newVariationsImmigrant),
                emigrant: parseInt(newVariationsEmigrant),
                total: parseInt(newVariationsTotal)
            };
    
            const existingData = insertedData.find(data => 
                data.Province === newVariationsProvince && data.Month === newVariationsMonth && data.immigrant === newVariationsImmigrant
                    && data.emigrant === newVariationsEmigrant && data.total === newVariationsTotal 
            );
            if (existingData) {
                mensajeUsuario = "Ya existe ese dato";
                return;
            }
    
            const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVariations)
            });
    
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getVariations();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newVariations);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
            }     
        }
        async function deleteVariations(variationsProvince){
            resultStatus = result = "";
            const res = await fetch(API+"/"+variationsProvince, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getVariations();
                mensajeUsuario = "Se ha borrado correctamente el dato seleccionado";
            }else{
                mensajeUsuario = "No se ha podido borrar el dato";
            }
        }
        async function deleteVariationsAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getVariations();
                mensajeUsuario = "Se han borrado correctamente los datos";
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }
        }
        async function getLimpiarFiltros(){
        resultStatus = result = "";
        if(filtroProvincia != ""){
            filtroProvincia = "";
        }
        getVariations();
        mensajeUsuario = "";
        return;
        }
    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Variaciones residenciales</h1>
    <p></p>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}

    <div class = "filtros">
        <div class = "filtroProvincia">
            <input placeholder="Provincia" bind:value={filtroProvincia}>
            <Button color = "primary" on:click={getVariationsFiltroProvincia}>Filtra por Provincia</Button>
        </div>
        <div class ="limpiarFiltros">
            <Button color="secondary" on:click={getLimpiarFiltros}>Limpiar Filtros</Button>
        </div>
    </div>
    <strong style="margin: 10px;">Número de datos: {variations.length}</strong>

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Provincia:</th>
            <th style="text-decoration: underline;">Mes:</th>
            <th style="text-decoration: underline;">Immigrante:</th>
            <th style="text-decoration: underline;">Emigrante:</th>
            <th style="text-decoration: underline;">Total:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><input placeholder="Provincia" bind:value={newVariationsProvince}></td>
                <td><input placeholder="Mes" bind:value={newVariationsMonth}></td>
                <td><input placeholder="Immigrantes" bind:value={newVariationsImmigrant}></td>
                <td><input placeholder="Emigrantes" bind:value={newVariationsEmigrant}></td>
                <td><input placeholder="Total" bind:value={newVariationsTotal}></td>
                <td><Button color="success" on:click={createVariations}>Crear</Button></td>
            </tr>
        
        {#each variations as variations }
          <tr>
            <td><a href="/residential-variations-stats/{variations.Province}/{variations.Month}">{variations.Province}</a></td>
            <td>{variations.Month}</td>
            <td>{variations.immigrant}</td>
            <td>{variations.emigrant}</td>
            <td>{variations.total}</td>
            <td><Button color="danger"on:click={deleteVariations(variations.Province)}>Borrar</Button></td>
          </tr>
        {/each}
        </tbody>
    </Table>
    
    <!--<Pagination style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;" ariaLabel="Page navigation example">
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href={getPaginacion}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
    </Pagination>-->
    <hr style="text-align: right; margin-left: 100px; margin-right: 100px;">

    {#if mensajePaginacion !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajePaginacion}</h2>
    {/if}
    <p></p>
    <div style="text-align: center; display: flex; justify-content: center; flex-direction: row; gap: 15px;">
        <td><input placeholder="A partir de: " bind:value={offsetFiltro}></td>
        <td><input placeholder="Límite" bind:value={limitFiltro}></td>
        <td><Button style="center" color="primary" on:click={getPaginacion}>Paginación</Button></td>
    </div>
    <p></p>
    <div style="text-align: center; word-spacing: 20px;">
        <Button color="danger" on:click={deleteVariationsAll}>Borrar Datos</Button>
        <Button color="success" on:click={loadData}>Cargar Datos</Button>
    </div>

    <style>
        .filtros{
            display: flex;
            justify-content: center;
        }
    
       /* .filtroAño{
            margin: 30px;
            display: flex;
            gap: 15px;
            }
    
        .limpiarFiltros{
            margin: 30px;
            display: flex;
            gap: 15px;
        }*/
        
        .filtroProvincia{
            margin: 30px;
            display: flex;
            gap: 15px;
        }
    </style>