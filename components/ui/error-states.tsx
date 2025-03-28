"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, Info, XCircle, ArrowLeft, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title: string
  description: string
  variant?: "critical" | "warning" | "info"
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  fullPage?: boolean
}

export function ErrorState({
  title,
  description,
  variant = "info",
  action,
  secondaryAction,
  className,
  fullPage = false,
}: ErrorStateProps) {
  const icons = {
    critical: <XCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  }

  const alertVariants = {
    critical: "destructive",
    warning: "warning",
    info: "default",
  }

  const buttonVariants = {
    critical: "destructive",
    warning: "warning",
    info: "default",
  }

  if (fullPage) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
        <Card className={cn("w-full max-w-md", className)}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {icons[variant]}
              <CardTitle>{title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
          <CardFooter className="flex gap-2">
            {action && (
              <Button
                variant={buttonVariants[variant]}
                onClick={action.onClick}
                className="flex-1"
              >
                {variant === "critical" && <RefreshCcw className="mr-2 h-4 w-4" />}
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="outline"
                onClick={secondaryAction.onClick}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {secondaryAction.label}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <Alert
      variant={alertVariants[variant] as "destructive" | "default"}
      className={cn("flex items-start gap-4", className)}
    >
      {icons[variant]}
      <div className="flex-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-1">{description}</AlertDescription>
        {(action || secondaryAction) && (
          <div className="mt-3 flex gap-2">
            {action && (
              <Button
                size="sm"
                variant={buttonVariants[variant]}
                onClick={action.onClick}
              >
                {variant === "critical" && <RefreshCcw className="mr-2 h-3 w-3" />}
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button size="sm" variant="outline" onClick={secondaryAction.onClick}>
                <ArrowLeft className="mr-2 h-3 w-3" />
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </Alert>
  )
} 