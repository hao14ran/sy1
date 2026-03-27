/**
 * @file UserStatusWidget.tsx
 * @description Embeddable React widget for HOJ to display current user login information.
 *              Uses an HTTP API to fetch the current logged-in user and renders either
 *              the user avatar/name or a "not logged in" state with a login button.
 */

import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

/**
 * @description Shape of the current user data returned by the backend API.
 *              Adapt this interface to match HOJ's real API response.
 */
export interface CurrentUser {
  /** Unique user identifier (string or number, depending on backend). */
  id: string | number
  /** Display username for this user. */
  username: string
  /** Optional avatar URL for this user. */
  avatar?: string | null
}

/**
 * @description Generic API response wrapper. Adjust fields to match HOJ backend.
 */
interface UserApiResponse {
  success: boolean
  data?: CurrentUser
}

/**
 * @description Fetch status for the current user request.
 */
type UserFetchStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * @description Result of the useCurrentUser hook, including state and helpers.
 */
interface UseCurrentUserResult {
  /** Latest user object, or null if not logged in. */
  user: CurrentUser | null
  /** True if the user is authenticated according to the API. */
  isAuthenticated: boolean
  /** Current loading / error / success state. */
  status: UserFetchStatus
  /** Optional error thrown by the request. */
  error: AxiosError | null
}

/**
 * @description Custom hook to fetch the current logged-in user from HOJ backend.
 *              It assumes cookie-based or token-based auth is already handled by axios.
 * @param apiEndpoint API endpoint for querying the current user, e.g. "/api/user/current".
 */
function useCurrentUser(apiEndpoint: string): UseCurrentUserResult {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [status, setStatus] = useState<UserFetchStatus>('idle')
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    let isCancelled = false

    /**
     * @description Internal helper to load current user info from the backend.
     */
    const fetchUser = async (): Promise<void> => {
      setStatus('loading')
      setError(null)

      try {
        const response = await axios.get<UserApiResponse>(apiEndpoint, {
          // If HOJ uses cookie + session auth, keep this true.
          // For token-based auth, configure axios interceptors instead.
          withCredentials: true,
        })

        if (isCancelled) return

        if (response.status === 200 && response.data && response.data.success && response.data.data) {
          setUser(response.data.data)
          setIsAuthenticated(true)
          setStatus('success')
        } else {
          // Treat any non-success response as "not logged in".
          setUser(null)
          setIsAuthenticated(false)
          setStatus('success')
        }
      } catch (err) {
        if (isCancelled) return

        const axiosError = err as AxiosError
        // 401 / 403 can be considered as "not logged in", not a hard error.
        if (axiosError.response && (axiosError.response.status === 401 || axiosError.response.status === 403)) {
          setUser(null)
          setIsAuthenticated(false)
          setStatus('success')
          setError(null)
        } else {
          setUser(null)
          setIsAuthenticated(false)
          setStatus('error')
          setError(axiosError)
        }
      }
    }

    // Optional: if HOJ already injects user info into a global variable,
    // you can short-circuit here to avoid the network request, e.g.:
    // const globalUser = (window as any).HOJ_USER as CurrentUser | undefined
    // if (globalUser) { setUser(globalUser); setIsAuthenticated(true); setStatus('success'); return }

    void fetchUser()

    return () => {
      isCancelled = true
    }
  }, [apiEndpoint])

  return { user, isAuthenticated, status, error }
}

/**
 * @description Props for the UserStatusWidget component.
 */
export interface UserStatusWidgetProps {
  /**
   * API endpoint to request current user info.
   * Default: "/api/user/current" (adjust to match HOJ backend).
   */
  apiEndpoint?: string
  /**
   * URL of the login page used when user is not authenticated.
   * Default: "/login".
   */
  loginUrl?: string
  /**
   * Optional extra className to allow host project to style the widget.
   */
  className?: string
  /**
   * Optional callback when login button is clicked.
   * If provided, this callback is called instead of direct window.location redirect.
   */
  onLoginClick?: () => void
}

/**
 * @description Small, embeddable widget that shows current HOJ user or a login prompt.
 *              Can be placed in any page header, sidebar, or problem page toolbar.
 */
export function UserStatusWidget(props: UserStatusWidgetProps): ReactElement {
  const {
    apiEndpoint = '/api/user/current',
    loginUrl = '/login',
    className = '',
    onLoginClick,
  } = props

  const { user, isAuthenticated, status } = useCurrentUser(apiEndpoint)

  /**
   * @description Handle click on the login button. Uses callback or fallback redirect.
   */
  const handleLoginClick = (): void => {
    if (onLoginClick) {
      onLoginClick()
    } else if (typeof window !== 'undefined') {
      window.location.href = loginUrl
    }
  }

  /**
   * @description Compute avatar content: either an image, first letter, or fallback icon.
   */
  const renderAvatar = (): ReactElement => {
    // If avatar URL exists, render an image.
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.username}
          className="hoj-user-avatar-img"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )
    }

    // Fallback: first letter of username or generic icon.
    const initial = user?.username?.[0]?.toUpperCase() ?? '?'
    return (
      <div
        className="hoj-user-avatar-fallback"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'var(--primary-color, #1890ff)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {initial}
      </div>
    )
  }

  // Loading skeleton: keep it minimal to blend with HOJ UI.
  if (status === 'loading' || status === 'idle') {
    return (
      <div
        className={`hoj-user-widget hoj-user-widget--loading ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          color: 'rgba(0,0,0,0.45)',
        }}
      >
        <div
          className="hoj-user-avatar-skeleton"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.06)',
          }}
        />
        <div
          className="hoj-user-name-skeleton"
          style={{
            width: 80,
            height: 12,
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.06)',
          }}
        />
      </div>
    )
  }

  // Not authenticated view.
  if (!isAuthenticated || !user) {
    return (
      <div
        className={`hoj-user-widget hoj-user-widget--guest ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          color: 'rgba(0,0,0,0.85)',
        }}
      >
        <div
          className="hoj-user-avatar-guest"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1px dashed rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: 'rgba(0,0,0,0.25)',
          }}
        >
          ?
        </div>
        <span className="hoj-user-label-guest">未登录</span>
        <button
          type="button"
          onClick={handleLoginClick}
          className="hoj-user-login-button"
          style={{
            marginLeft: 8,
            padding: '2px 10px',
            fontSize: 12,
            borderRadius: 12,
            border: '1px solid var(--primary-color, #1890ff)',
            color: 'var(--primary-color, #1890ff)',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          去登录
        </button>
      </div>
    )
  }

  // Authenticated view.
  return (
    <div
      className={`hoj-user-widget hoj-user-widget--auth ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {renderAvatar()}
      <span className="hoj-user-name" style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {user.username}
      </span>
    </div>
  )
}