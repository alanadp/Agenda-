
create table compromissos(
    id uuid constraint pk_compromissos primary key 
            constraint df_compromissos_id default gen_random_uuid(),
    descricao varchar(100) not null
            constraint uk_compromissos_descricao unique
)    

--Habilitar RLS - Row Level Security no Supabase
alter table compromissos enable row level security;
--Politica de leitura
create policy "Permitir leitura pública das categorias"
on compromissos for select using (true);
--Politica de insert/update (with check é a condição de checagem)
create policy "Bloquear alterações nos compromissos"
on compromissos for all using (false) with check(false);