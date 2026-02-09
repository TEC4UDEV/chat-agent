-- Políticas de Storage para o bucket "configuracoes-imagens".
-- Crie o bucket no Dashboard: Storage → New bucket → Name: configuracoes-imagens, Public: true.
-- Tamanho máximo sugerido: 5MB. Tipos: image/jpeg, image/png, image/gif, image/webp.

-- Usuários autenticados podem inserir apenas na pasta com o próprio user_id
create policy "Upload apenas na própria pasta"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'configuracoes-imagens'
    and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
  );

-- Leitura pública (bucket público)
create policy "Leitura pública das imagens"
  on storage.objects for select
  to public
  using (bucket_id = 'configuracoes-imagens');

-- Usuários podem atualizar apenas arquivos na própria pasta
create policy "Atualizar apenas na própria pasta"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'configuracoes-imagens'
    and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
  )
  with check (
    bucket_id = 'configuracoes-imagens'
    and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
  );

-- Usuários podem excluir apenas arquivos na própria pasta
create policy "Excluir apenas na própria pasta"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'configuracoes-imagens'
    and (storage.foldername(name))[1] = (select auth.jwt()->>'sub')
  );
