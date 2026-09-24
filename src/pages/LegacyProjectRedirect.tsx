import { Navigate, useParams } from 'react-router'

/** Endereços antigos do WordPress (/projectos/…) continuam a funcionar. */
export default function LegacyProjectRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/projetos/${slug}` : '/projetos'} replace />
}
