
create table if not exists agendamentos (
  id uuid constraint pk_agendamentos primary key default gen_random_uuid(),
  user_id uuid constraint fk_agendamentos_user references auth.users on delete cascade
         constraint df_agendamentos_user default auth.uid(),
  compromisso_id uuid constraint fk_agendamentos_compromisso references compromissos(id) on delete restrict,
  descricao varchar(200),
  data_agendamento timestamp not null,

  created_at timestamp with time zone constraint df_agendamentos_created default timezone('utc', now()),
  updated_at timestamp with time zone constraint df_agendamentos_updated default timezone('utc', now())
);


alter table agendamentos enable row level security;


create policy "Permitir SELECT apenas do usuário dono"
on agendamentos
for select
using (auth.uid() = user_id);


create policy "Permitir INSERT para usuários autenticados"
on agendamentos
for insert
to authenticated
with check (true);


create policy "Permitir UPDATE apenas do usuário dono"
on agendamentos
for update
using (auth.uid() = user_id);


create policy "Permitir DELETE apenas do usuário dono"
on agendamentos
for delete
using (auth.uid() = user_id);
