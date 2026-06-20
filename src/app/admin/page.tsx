'use client'

import contentEnDefault from '../../../content/cms/en.json'
import contentFrDefault from '../../../content/cms/fr.json'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Blockquote } from '@/components/Blockquote'
import { DatePicker, TimePicker } from '@/admin/date-picker'
import {
  AdminShell,
  SectionCard,
  EditableText,
  EditableImage,
  LoginScreen,
  useAdminContent,
  useFieldChange,
} from 'dustcms/react'
import { cmsConfig } from '@/cms/config'
import 'dustcms/styles.css'
import './dustcms-theme.css'

const contentEn = contentEnDefault as CMSContent
const contentFr = contentFrDefault as CMSContent

interface CMSContent extends Record<string, unknown> {
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    ctaActivities: string
    ctaContact: string
    background: string
  }
  community: {
    eyebrow: string
    heading: string
    body: string[]
    link: string
    image: string
  }
  activities: {
    intro: string
    items: Array<{ title: string; description: string; image: string }>
  }
  events: Array<{ id: string; title: string; date: string; time: string; location: string }>
}

const defaults = { en: contentEn, fr: contentFr }

export default function AdminPage() {
  const admin = useAdminContent<CMSContent>(cmsConfig, defaults)
  const handleChange = useFieldChange<CMSContent>(admin.setContent)

  if (!admin.logged) {
    return <LoginScreen apiEndpoint="/api/cms" onLogin={() => admin.setLogged(true)} />
  }

  return (
    <AdminShell
      locale={admin.locale}
      onLocaleChange={admin.setLocale}
      dirty={admin.dirty}
      onPush={admin.push}
      pushing={admin.pushing}
      pushStatus={admin.pushStatus}
      pushMessage={admin.pushMessage}
      locales={cmsConfig.locales}
      siteTitle="Bahá'í Community of Winnipeg"
      sectionLabels={['Hero', 'Community', 'Activities', 'Events']}
    >
      <SectionCard id="section-hero" label="Hero" page="Homepage" bgColor="bg-ivory">
        <HeroSection
          {...admin.content.hero}
          editing={null}
          onEdit={() => {}}
          onChange={handleChange}
        />
      </SectionCard>

      <SectionCard id="section-community" label="Community" page="Homepage" bgColor="bg-ivory">
        <CommunitySection
          {...admin.content.community}
          editing={null}
          onEdit={() => {}}
          onChange={handleChange}
        />
      </SectionCard>

      <SectionCard id="section-activities" label="Activities" page="Homepage" bgColor="bg-parchment">
        <ActivitiesSection
          intro={admin.content.activities.intro}
          items={admin.content.activities.items}
          editing={null}
          onEdit={() => {}}
          onChange={handleChange}
        />
      </SectionCard>

      <SectionCard id="section-events" label="Events" page="Events Page" bgColor="bg-ivory">
        <EventsSection
          events={admin.content.events}
          editing={null}
          onEdit={() => {}}
          onChange={handleChange}
          onAdd={() => {
            const nextWeek = new Date()
            nextWeek.setDate(nextWeek.getDate() + 7)
            admin.setContent((prev: CMSContent) => ({
              ...prev,
              events: [...prev.events, {
                id: String(Date.now()),
                title: 'New Event',
                date: nextWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                time: '2:00 PM',
                location: 'Community Home',
              }],
            }))
          }}
          onRemove={(id: string) => {
            admin.setContent((prev: CMSContent) => ({
              ...prev,
              events: prev.events.filter((ev: { id: string }) => ev.id !== id),
            }))
          }}
          locale={admin.locale}
        />
      </SectionCard>
    </AdminShell>
  )
}

function HeroSection({
  eyebrow, heading, subheading, ctaActivities, ctaContact, background,
  editing, onEdit, onChange,
}: CMSContent['hero'] & { editing: string | null; onEdit: (field: string) => void; onChange: (field: string, value: string) => void }) {
  return (
    <Container className="relative py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 -bottom-8 lg:-bottom-32 -z-10 flex justify-center" style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,1))', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,1))' }}>
        <img src={background} alt="" className="w-full object-contain object-top" />
      </div>
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 h-px w-24 bg-gold-500" />
          <EditableText field="hero.eyebrow" value={eyebrow} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="font-display text-sm uppercase tracking-[0.3em] text-gold-600" />
          <EditableText field="hero.heading" value={heading} editing={editing} onEdit={onEdit} onChange={onChange} as="h1" className="mt-8 block font-display text-4xl font-normal leading-tight tracking-tight text-burgundy-900 sm:text-5xl lg:text-6xl" />
          <EditableText field="hero.subheading" value={subheading} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-8 font-display text-lg italic text-burgundy-600 sm:text-xl" />
          <div className="mt-12 flex justify-center gap-6">
            <span className="inline-flex border border-burgundy-900 bg-burgundy-900 px-8 py-3 text-sm uppercase tracking-widest text-ivory">{ctaActivities}</span>
            <span className="inline-flex border border-burgundy-300 px-8 py-3 text-sm uppercase tracking-widest text-burgundy-700">{ctaContact}</span>
          </div>
          <div className="mx-auto mt-12 h-px w-24 bg-gold-500" />
        </div>
      </FadeIn>
    </Container>
  )
}

function CommunitySection({
  eyebrow, heading, body, link, image,
  editing, onEdit, onChange,
}: CMSContent['community'] & { editing: string | null; onEdit: (field: string) => void; onChange: (field: string, value: string) => void }) {
  return (
    <div className="lg:flex lg:items-center lg:gap-x-12">
      <div className="lg:w-1/2">
        <div className="mb-4 h-px w-16 bg-burgundy-300" />
        <EditableText field="community.eyebrow" value={eyebrow} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="font-display text-sm uppercase tracking-[0.25em] text-burgundy-500" />
        <EditableText field="community.heading" value={heading} editing={editing} onEdit={onEdit} onChange={onChange} as="h2" className="mt-4 block font-display text-3xl font-normal text-burgundy-900 sm:text-4xl" />
        <div className="mt-6 space-y-4 text-base leading-relaxed text-burgundy-700">
          {body.map((p, i) => (
            <EditableText key={i} field={`community.body.${i}`} value={p} editing={editing} onEdit={onEdit} onChange={onChange} as="p" />
          ))}
        </div>
        <div className="mt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900">{link} <span aria-hidden="true">&rarr;</span></span>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/2">
        <EditableImage field="community.image" src={image} alt="Community" editing={editing} onEdit={onEdit} onChange={onChange} className="w-full object-contain rounded-lg" />
      </div>
    </div>
  )
}

function ActivitiesSection({
  intro, items,
  editing, onEdit, onChange,
}: { intro: string; items: CMSContent['activities']['items']; editing: string | null; onEdit: (field: string) => void; onChange: (field: string, value: string) => void }) {
  return (
    <>
      <div className="mb-8">
        <EditableText field="activities.intro" value={intro} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="text-xl text-burgundy-700" />
        <Blockquote author={{ name: "Bahá'u'lláh", role: "Founder of the Bahá'í Faith" }} className="mt-6">
          Let your vision be world-embracing, rather than confined to your own self.
        </Blockquote>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {items.map((activity, idx) => (
          <article key={idx} className="group relative flex flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
            <div className="relative flex h-48 items-center justify-center overflow-hidden">
              <EditableImage field={`activities.items.${idx}.image`} src={activity.image} alt="" editing={editing} onEdit={onEdit} onChange={onChange} className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 h-px w-8 bg-gold-400" />
              <EditableText field={`activities.items.${idx}.title`} value={activity.title} editing={editing} onEdit={onEdit} onChange={onChange} as="h3" className="font-display text-xl font-normal text-burgundy-900" />
              <EditableText field={`activities.items.${idx}.description`} value={activity.description} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-3 flex-1 text-sm leading-relaxed text-burgundy-700" />
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

function EventsSection({
  events, editing, onEdit, onChange, onAdd, onRemove, locale,
}: {
  events: CMSContent['events']
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
  locale: string
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, idx) => (
        <div key={event.id} className="group relative">
          <article className="flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="space-y-2">
                <DatePicker field={`events.${idx}.date`} value={event.date} editing={editing} onEdit={onEdit} onChange={onChange} locale={locale as 'en' | 'fr'} className="text-sm font-semibold text-burgundy-900" />
                <TimePicker field={`events.${idx}.time`} value={event.time} editing={editing} onEdit={onEdit} onChange={onChange} locale={locale as 'en' | 'fr'} />
              </div>
              <EditableText field={`events.${idx}.title`} value={event.title} editing={editing} onEdit={onEdit} onChange={onChange} as="h3" className="mt-6 font-display text-2xl font-normal text-burgundy-900" />
              {event.location && (
                <EditableText field={`events.${idx}.location`} value={event.location} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-2 text-sm text-burgundy-500" />
              )}
            </div>
          </article>
          <button
            onClick={() => onRemove(event.id)}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-stone-400 opacity-0 transition backdrop-blur group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
            aria-label="Remove event"
          >
            <TrashIcon />
          </button>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="flex w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-burgundy-200 bg-stone-50 py-16 text-sm font-medium text-burgundy-400 transition hover:border-burgundy-300 hover:bg-ivory hover:text-burgundy-600"
      >
        <PlusIcon />
        Add Event
      </button>
    </div>
  )
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
