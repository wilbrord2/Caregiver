import { useAppContext } from '../../context'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as SearchIcon } from '../../assets/searchIcon.svg'

function SingleNavItem({ item }) {
  const { activeLink, setActiveLink, setIsMenuOpen } = useAppContext()
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <li
      onClick={() => {
        setActiveLink(item.name)
        setIsMenuOpen(false)
      }}
    >
      {location.pathname === '/' ? (
        <a
          href={item.href}
          className={`${styles.defaultLinkStyles} ${
            item.name === activeLink ? styles.activeLinkStyles : ''
          }`}
        >
          {t(`links.${item.name}`)}
        </a>
      ) : (
        <Link
          to={item.href}
          className={`${styles.defaultLinkStyles} ${
            item.name === activeLink ? styles.activeLinkStyles : ''
          }`}
        >
          {item.name === 'search' ? (
            <div className='bg-white p-2 rounded-full'>
              <SearchIcon className={styles.search} />
            </div>
          ) : (
            t(`links.${item.name}`)
          )}
        </Link>
      )}
    </li>
  )
}

export default SingleNavItem
