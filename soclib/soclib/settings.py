import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-0#cjzut_5t$flx&-l15r&)ay%q=^cn2az%e-%98@)f541afa)b'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = (os.environ.get("DEBUG", "True") == "True")

ALLOWED_HOSTS = ["0.0.0.0","localhost"]

AUTH_USER_MODEL = "lms.LibraryUser"
# Application definition

CORS_ALLOW_ALL_ORIGINS = True

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "rest_framework",
    "corsheaders",
    "lms",
    "firebase_admin",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'soclib.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'soclib.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

# print(DEBUG, type(DEBUG))

if DEBUG:
    defaultDatabase = {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        } 
else:
    defaultDatabase = {
        'ENGINE': os.environ.get('DB_DRIVER','django.db.backends.postgresql'),
        'USER': os.environ.get('PG_USER','postgres'),
        'PASSWORD':os.environ.get('PG_PASSWORD','postgres'),
        'NAME': os.environ.get('PG_DB','postgres'),
        'PORT': os.environ.get('PG_PORT','5432'),
        'HOST': os.environ.get('PG_HOST','localhost'), # uses the container if set, otherwise it runs locally
    }

# print(defaultDatabase)

DATABASES = {
    'default': defaultDatabase
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

FIREBASE_CONFIG = os.path.join(BASE_DIR, "firebase_admin_conf.json")