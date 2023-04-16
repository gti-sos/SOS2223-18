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
        
        let residentialVariations=[];
        let Province = "";
        let Month = "";
        let immigrant_over = "";
        let immigrant_under = "";
        let emigrant_over = "";
        let emigrant_under = "";
        let total_over = "";
        let total_under = "";
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

        async function getVariationsFiltros() {
        const consulta = {};
        if (Province) {
            consulta.Province = Province;
        }
        if (Month) {
            consulta.Month = Month;
        }
        if (from) {
            consulta.from = from;
        }
        if (to) {
            consulta.to = to;
        }
        if (immigrant_over) {
            consulta.immigrant_over = immigrant_over;
        }
        if (immigrant_under) {
            consulta.immigrant_under = immigrant_under;
        }
        if (emigrant_over) {
            consulta.emigrant_over = emigrant_over;
        }
        if (emigrant_under) {
            consulta.emigrant_under = emigrant_under;
        }
        if (total_over) {
            consulta.total_over = total_over;
        }
        if (total_under) {
            consulta.total_under = total_under;
        }

        console.log(new URLSearchParams(consulta).toString());

        const res = await fetch(
            API + `?${new URLSearchParams(consulta).toString()}`,
            {
                method: "GET",
            }
        );
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            residentialVariations = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            mensajeUsuario = "Datos correspondientes al filtro";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        } else {
            mensajeUsuario = "No se han podido encontrar los datos";
            setTimeout(() => {
                mensajeUsuario = "";
            }, 3000);
        }
    }

        /*async function getVariationsFiltroProvincia(){
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
        }*/
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

    <!-- <div class = "filtros">
        <div class = "filtroProvincia">
            <input placeholder="Provincia" bind:value={filtroProvincia}>
            <Button color = "primary" on:click={getVariationsFiltroProvincia}>Filtra por Provincia</Button>
        </div>
        <div class ="limpiarFiltros">
            <Button color="secondary" on:click={getLimpiarFiltros}>Limpiar Filtros</Button>
        </div>
    </div>
    <strong style="margin: 10px;">Número de datos: {variations.length}</strong> -->
    <div class="filtros">
        <!--<div class="filtro">
            <input placeholder="Año de inicio" bind:value={from} />
            <input placeholder="Año Final" bind:value={to} />
        </div> -->
    
        <div class="filtro">
            <input placeholder="Provincia" bind:value={Province} />
        </div>
        
        <div class = "filtro">
            <input placeholder="Año" bind:value={Month} />
        </div> 
    </div>
    
    <div class = "filtros">
        <div class = "filtro">
            <input placeholder="Identificador mayor o igual" bind:value={immigrant_over} />
        </div> 
        <div class = "filtro">
            <input placeholder="Identificador menor o igual" bind:value={immigrant_under} />
        </div> 
    </div>
    
    <div class = "filtros">
        <div class = "filtro">
            <input placeholder="Localidad mayor o igual" bind:value={emigrant_over} />
        </div> 
        <div class = "filtro">
            <input placeholder="Localidad menor o igual" bind:value={emigrant_under} />
        </div> 
    </div>
    
    <div class = "filtros">
        <div class = "filtro">
            <input placeholder="Código postal mayor o igual" bind:value={total_over} />
        </div> 
        <div class = "filtro">
            <input placeholder="Código postal menor o igual" bind:value={total_under} />
        </div> 
    </div>
    
    <div class = "botones">
        <div class = "filtro">
            <Button color = "primary" on:click={getVariationsFiltros}> Filtrar </Button>
        </div>
    
        <div class="filtro">
            <Button color="secondary" on:click={getLimpiarFiltros}>
                Limpiar Filtros
            </Button>
        </div>
    </div>
        
    
    
    <strong style="margin: 10px;">Número de datos: {residentialVariations.length}</strong>

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

    <!--<style>
        .filtros{
            display: flex;
            justify-content: center;
        }
    
        .filtroAño{
            margin: 30px;
            display: flex;
            gap: 15px;
            }
    
        .limpiarFiltros{
            margin: 30px;
            display: flex;
            gap: 15px;
        }
        
        .filtroProvincia{
            margin: 30px;
            display: flex;
            gap: 15px;
        }
    </style> -->

    <style>
        .filtros {
            display: flex;
            justify-content: center;
        }
    
        .filtro {
            margin: 30px;
            display: flex;
            gap: 15px;
        }
    
        .botones {
            display: flex;
            justify-content: center;
            margin: 15px;
        }
    </style>